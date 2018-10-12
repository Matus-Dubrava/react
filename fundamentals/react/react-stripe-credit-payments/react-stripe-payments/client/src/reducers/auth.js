import { FETCH_USER, FETCH_USER_FAIL } from '../actions/types';

const INITIAL_STATE = {
    auth: null,
    error: ''
};

const fetchUser = (state, action) => {
    return {
        ...state,
        auth: action.user,
        error: ''
    };
};

const fetchUserFail = (state, action) => {
    return {
        ...state,
        error: action.error
    };
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER:
            return fetchUser(state, action);
        case FETCH_USER_FAIL:
            return fetchUserFail(state, action);
        default:
            return state;
    }
};
