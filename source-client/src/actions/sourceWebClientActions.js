import { PRINT_JOB_FORM, REQUEST_FORM,SHOW_PRINT_DIALOG, SHOW_REQUEST_DIALOG, 
         IS_AUTHENTICATED, SELECT_SECTION, LOADING, RESET_SUCCESS_MESSAGE, ROW_CLICKED,
        FETCH_ROW_DATA, DISPLAY_DRAWER } from './types';
import FormRequest from '../Async/FormRequests';
import DataFetcher from '../Async/DataFetcher';

const PRINT_FORM_TYPE = 'pRequest';
const LOAN_FORM_TYPE = 'lRequest';
const GRAPHIC_FORM_TYPE = 'gRequest';

const _fetchRowData = (type) => dispatch => {
    //debugger;
    dispatch(fetchRowData(type));
}

export const triggerPrintDialog = (value) => dispatch => {
    dispatch({
        type: SHOW_PRINT_DIALOG,
        payload: value
    })
};

export const triggerRequestDialog = (value) => dispatch => {
    dispatch({
        type: SHOW_REQUEST_DIALOG,
        payload: value
    })
};

export const authenticated = (authenticatedStatus, userName, userUrl) => dispatch => {
    dispatch({
        type: IS_AUTHENTICATED,
        payload: {
            isAuthenticated: authenticatedStatus,
            userName: userName,
            userPicture: userUrl,
        }
    });
}

export const selectLeftPaneSection = (value) => dispatch => {
    //debugger;
    switch (value) {
        case 1:
            dispatch(_fetchRowData(PRINT_FORM_TYPE));
            break;
        case 2: 
            dispatch(_fetchRowData(GRAPHIC_FORM_TYPE));
            break;
        case 3:
            dispatch(_fetchRowData(LOAN_FORM_TYPE));
            break;
        default:
            break;
    }
    dispatch({
        type: SELECT_SECTION,
        payload: value
    });
}

export const loading = (value) => dispatch => {
    dispatch({
        type: LOADING,
        payload: value,
    });
}

export const submitPrintForm = (formData) => dispatch => {
    dispatch(loading(true));
    FormRequest.submitFormWithUpload(PRINT_FORM_TYPE, formData).then((success) => {
        dispatch(loading(false));
        dispatch({
            type: PRINT_JOB_FORM,
            payload: success,
        });
    });
}


export const submitRequestForm = (formData) => dispatch => {
    dispatch(loading(true));
    FormRequest.buildAndSubmitRequestForm(formData).then((success) => {
        dispatch(loading(false))
        dispatch({
            type: REQUEST_FORM,
            payload: success,
        })
    });
}

export const resetSuccessMessage = () => dispatch => {
    dispatch({
        type: RESET_SUCCESS_MESSAGE,
        payload: null,
    })
}

export const rowClicked = (value) => dispatch => {
    dispatch({
        type: ROW_CLICKED,
        payload: value,
    })
    dispatch(displayDrawer(true));
}

export const displayDrawer = (value) => dispatch => {
    dispatch({
        type: DISPLAY_DRAWER,
        payload: value,
    })
}

export const fetchRowData = (type) => dispatch => {
    dispatch(loading(true));
    DataFetcher.grabRequestData(type).then((response) => {
        dispatch(loading(false));
        dispatch({
            type: FETCH_ROW_DATA,
            payload: response,
        })
    }).catch(err => { throw new Error(err) })
}

