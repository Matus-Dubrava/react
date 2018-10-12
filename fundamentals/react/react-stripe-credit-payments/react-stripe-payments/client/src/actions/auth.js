import axios from 'axios';

import { FETCH_USER, FETCH_USER_FAIL } from './types';

export const fetchUser = () => async dispatch => {
    try {
        const response = await axios.get('/auth/current_user');

        dispatch({ type: FETCH_USER, user: response.data });
    } catch (err) {
        dispatch({ type: FETCH_USER_FAIL, error: err });
    }
};

export const handleStripeToken = token => async dispatch => {
    try {
        const response = await axios.post('/billing/charge', { token });

        dispatch({ type: FETCH_USER, user: response.data });
    } catch (err) {
        dispatch({ type: FETCH_USER_FAIL, error: err });
    }
};
