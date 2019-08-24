import { IS_AUTHENTICATED, SELECT_SECTION, FETCH_ROW_DATA, 
        ROW_CLICKED, DISPLAY_DRAWER } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    selectedSection: 1,
    userName: null,
    userPicture: null,
    data: [],
    drawerData: {},
    showDrawer: false,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case IS_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated,
                userName: action.payload.userName,
                userPicture: action.payload.userPicture,
            };
        
        case SELECT_SECTION:
            return  {
                ...state,
                selectedSection: action.payload,
                data: [],
            };
        
        case FETCH_ROW_DATA:
            return {
                ...state,
                data: action.payload,
            };
        case ROW_CLICKED:
            let data = state.data.find(          
                item => {
                    return item.data.id == [action.payload]
                });
            return {
                ...state,
                drawerData: data,
            }
        case DISPLAY_DRAWER:
            return {
                ...state,
                showDrawer: action.payload,
            }
        default:
            return state;
    }
}