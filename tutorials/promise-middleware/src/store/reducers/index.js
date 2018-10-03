import { combineReducers } from 'redux';

import commentsReducer from './comments';
import authReducer from './auth';

const rootReducer = combineReducers({
    comments: commentsReducer,
    auth: authReducer
});

export default rootReducer;