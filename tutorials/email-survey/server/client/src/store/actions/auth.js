import axios from 'axios';

import { FETCH_USER } from './actionTypes';

export const fetchUser = () => async dispatch => {
    try {
        const response = await axios.get('/api/current_user');
        dispatch({ type: FETCH_USER, payload: response.data });
    } catch (err) {}
};

export const handleToken = token => async dispatch => {
    const response = await axios.post('/api/stripe', token);

    try {
        dispatch({ type: FETCH_USER, payload: response.data });
    } catch (err) {}
};
