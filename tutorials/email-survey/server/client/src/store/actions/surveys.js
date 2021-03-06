import axios from 'axios';

import * as types from './actionTypes';

export const submitSurvey = (values, callback) => async dispatch => {
    const res = await axios.post('/api/surveys', values);

    dispatch({
        type: types.FETCH_USER,
        payload: res.data
    });

    if (typeof callback === 'function') {
        callback();
    }
};

export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys');

    dispatch({
        type: types.FETCH_SURVEYS,
        surveys: res.data
    });
};
