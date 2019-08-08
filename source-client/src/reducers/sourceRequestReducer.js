import { PRINT_JOB_FORM, REQUEST_FORM,SHOW_PRINT_DIALOG,
     SHOW_REQUEST_DIALOG, LOADING, RESET_SUCCESS_MESSAGE } from '../actions/types';



const initialState = {
    showPrintDialog: false,
    showRequestDialog: false,
    successRequest: null,
    loading: false,
}

export default function (state = initialState, action) {
    debugger;
    switch (action.type) {
        case SHOW_PRINT_DIALOG:
            return {
                ...state,
                showPrintDialog: action.payload,
            };
        case SHOW_REQUEST_DIALOG:
            return {
                ...state,
                showRequestDialog: action.payload,
            };
        case PRINT_JOB_FORM:
            return {
                ...state,
                successRequest: action.payload,
            };
        case REQUEST_FORM:
            return {
                ...state,
                successRequest: action.payload,
            };
        case LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case RESET_SUCCESS_MESSAGE:
            return {
                ...state,
                successRequest: null,
            }
        default:
            return state;
    }
}
