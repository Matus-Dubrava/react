import axios from 'axios';

import * as actionTypes from './actionTypes';

export const signup = (formProps, callback) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:4000/signup', formProps);
        dispatch({ type: actionTypes.AUTH_USER, payload: response.data.token });
        localStorage.setItem('token', response.data.token);
        callback();
    } catch (err) {
        dispatch({ type: actionTypes.AUTH_ERROR, payload: 'Email in use' });
    }
};

export const signin = (formProps, callback) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:4000/signin', formProps);
        dispatch({ type: actionTypes.AUTH_USER, payload: response.data.token });
        localStorage.setItem('token', response.data.token);
        callback();
    } catch (err) {
        dispatch({ type: actionTypes.AUTH_ERROR, payload: 'Invalid login credential.' });
    }
};

export const signout = () => {
    localStorage.removeItem('token');

    return {
        type: actionTypes.AUTH_USER,
        payload: ''
    };
};