import * as actionTypes from '../actions/actionTypes';

const initalState = {
    isAuthenticated: false
};

const toggleAuth = (state, action) => {
    return {
        ...state, 
        isAuthenticated: !state.isAuthenticated
    };
};

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_AUTH: return toggleAuth(state, action);
        default: return state;
    }
};

export default reducer;