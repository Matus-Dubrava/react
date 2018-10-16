import * as types from '../actions/actionTypes';

export default (state = [], action) => {
    switch (action.type) {
        case types.FETCH_SURVEYS:
            return action.surveys;
        default:
            return state;
    }
};
