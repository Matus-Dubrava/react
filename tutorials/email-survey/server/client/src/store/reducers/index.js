import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './auth';
import surveyReducer from './surveys';

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    survey: surveyReducer
});
