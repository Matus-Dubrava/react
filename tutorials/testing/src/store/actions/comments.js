import axios from 'axios';

import * as actionTypes from './actionTypes';

export const addComment = (comment) => {
    return {
        type: actionTypes.ADD_COMMENT,
        comment
    };
};

export const fetchCommentsSucces = (comments) => {
    return {
        type: actionTypes.FETCH_COMMENTS_SUCCESS,
        comments
    };
};

export const fetchComments = () => {
    return (dispatch) => {
        axios.get('http://jsonplaceholder.typicode.com/comments')
            .then((res) => {
                dispatch(fetchCommentsSucces(res.data));
            });
    };
};