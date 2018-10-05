import axios from 'axios';

import * as actionTypes from './actionTypes';

export const signup = (formProps) => (dispatch) => {
    axios.post('http://localhost:4000/signup', formProps);
};