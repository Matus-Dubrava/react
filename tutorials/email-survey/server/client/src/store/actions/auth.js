import axios from 'axios';

import { FETCH_USER } from './actionTypes';

export const fetchUser = async dispatch => {
    try {
        const response = await axios.get('/api/current_user');
        console.log(response.data);
        dispatch({ type: FETCH_USER });
    } catch (err) {}
};
