import axios from 'axios';

import * as actionTypes from './actionTypes';

const generateId = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let id = '';

    for (let i = 0; i < 10; i++) {
        id += chars[Math.floor(Math.random() * chars.length)];
    }

    return id;
}

export const addComment = (comment) => {
    return {
        type: actionTypes.ADD_COMMENT,
        payload: { name: comment, id: generateId() }
    };
};

export const fetchComments = () => {
    const response = axios.get('https://jsonplaceholder.typicode.com/comments');
    
    return {
        type: actionTypes.FETCH_COMMENTS,
        payload: response
    };
}
