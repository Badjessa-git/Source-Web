import { combineReducers } from 'redux';
import soureRequestReducer from './sourceRequestReducer';
import sourcePageReducer from './sourcePageReducer';

export default combineReducers({
    dialog: soureRequestReducer,
    page: sourcePageReducer
})