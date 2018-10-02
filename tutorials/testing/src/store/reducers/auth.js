import * as actionTypes from '../actions/actionTypes';

const initialState = {
    isAuthenticated: false
};

const toggleAuth = (state, action) => {
    return {
        ...state,
        isAuthenticated: action.isAuthenticated
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_AUTH: return toggleAuth(state, action);
        default: return state;
    }
};

export default reducer;