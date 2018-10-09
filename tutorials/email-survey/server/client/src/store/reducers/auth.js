import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isAuthenticated: null
};

const fetchUser = (state, action) => {
    return {
        ...state,
        isAuthenticated: action.payload || false
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER:
            return fetchUser(state, action);
        default:
            return state;
    }
};

export default reducer;
