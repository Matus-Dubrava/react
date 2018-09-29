import { combineReducers } from 'redux';

import chartReducer from './charts';

const rootReducer = combineReducers({
    charts: chartReducer
});

export default rootReducer;