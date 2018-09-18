import axios from 'axios';

import * as actionTypes from './actionTypes';

export const fetchDataStart = () => {
  return {
    type: actionTypes.FETCH_DATA_START
  };
};

export const fetchDataFail = (error) => {
  return {
    type: actionTypes.FETCH_DATA_FAIL,
    error
  };
};

export const fetchDataSuccess = (data) => {
  return {
    type: actionTypes.FETCH_DATA_SUCCESS,
    data
  };
};

export const fetchData = () => {
  return (dispatch) => {
    dispatch(fetchDataStart());

    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then((res) => {
        dispatch(fetchDataSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchDataFail(err));
      });
  };
};