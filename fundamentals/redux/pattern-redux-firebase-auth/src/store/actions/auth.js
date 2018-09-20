import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authInit = () => {
  return {
    type: actionTypes.AUTH_INIT
  };
};

export const authSuccess = (token, email, userId, expiresIn) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    email,
    token,
    expiresIn,
    userId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const authAutoLogin = (email, userId, expiresIn, token) => {
  return (dispatch) => {
    dispatch(authSuccess(token, email, userId, expiresIn));

    setTimeout(() => {
      dispatch(logout());
    }, +expiresIn * 1000);
  };
};

export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authInit());

    const postData = {
      email,
      password,
      returnSecureToken: true
    };

    axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAg7jAuj1Y6Z0PgB3AGhNEbegznloNYAB8', postData)
      .then((res) => {
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('userId', res.data.localId);
        localStorage.setItem('expirationDate', new Date(Date.now() + +res.data.expiresIn * 1000));
        localStorage.setItem('email', res.data.email);

        dispatch(authSuccess(
          res.data.idToken,
          res.data.email,
          res.data.localId,
          +res.data.expiresIn
        ));

        setTimeout(() => {
          dispatch(logout());
        }, +res.data.expiresIn * 1000);
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');

  return {
    type: actionTypes.LOGOUT
  };
};



