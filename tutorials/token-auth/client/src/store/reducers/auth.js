import * as actionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
    authenticated: '',
    errorMessage: ''
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default: return state;
    }
};

export default reducer;