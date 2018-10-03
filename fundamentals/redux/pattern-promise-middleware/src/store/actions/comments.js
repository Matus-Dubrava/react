import axios from 'axios';

import * as actionTypes from './actionTypes.js';

export const fetchComments = () => {
    const response = axios.get('https://jsonplaceholder.typicode.com/comments');

    return {
        type: actionTypes.FETCH_COMMENTS,
        payload: response
    };
};

