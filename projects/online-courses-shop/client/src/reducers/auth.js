import * as actions from '../actions/types';

const INITIAL_STATE = {
    email: '',
    error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        default:
            return state;
    }
};
