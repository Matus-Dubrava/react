import * as actionTypes from './actionTypes';

export const addComment = (comment) => {
    return {
        type: actionTypes.ADD_COMMENT,
        comment
    };
};