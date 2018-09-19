import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    
    const authData = {
      email, 
      password,
      returnSecureToken: true
    };

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAx0feICyI7dQNjQCkTCCltokF6li6XVKE';
    if (!isSignup) {
      url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAx0feICyI7dQNjQCkTCCltokF6li6XVKE';
    }

    axios.post(url, authData)
      .then((res) => {
        dispatch(authSuccess(res.data));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  };
};