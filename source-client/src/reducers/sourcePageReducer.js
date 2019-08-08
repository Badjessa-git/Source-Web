import { IS_AUTHENTICATED, SELECT_SECTION } from '../actions/types';

const initialState = {
    isAuthenticated: false,
    selectedSection: 1,
    userName: null,
    userPicture: null,
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
            }
        default:
            return state;
    }
}