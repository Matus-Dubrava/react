import * as actionTypes from './actionTypes';

export const toggleAuth = (isAuthenticated) => {
    return {
        type: actionTypes.TOGGLE_AUTH,
        isAuthenticated
    };
};
