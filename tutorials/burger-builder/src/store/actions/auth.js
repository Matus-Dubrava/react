// import axios from 'axios';

import * as actionTypes from './actionTypes';

export const logout = () => {
  // localStorage.removeItem('token');
  // localStorage.removeItem('expirationDate');
  // localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  }
};

export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = (expirationTime) => {
  // return (dispatch) => {
  //   setTimeout(() => {
  //     dispatch(logout());
  //   }, +expirationTime * 1000);
  // }
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime
  };
};

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
  // return (dispatch) => {
  //   dispatch(authStart());
    
  //   const authData = {
  //     email, 
  //     password,
  //     returnSecureToken: true
  //   };

  //   let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAx0feICyI7dQNjQCkTCCltokF6li6XVKE';
  //   if (!isSignup) {
  //     url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAx0feICyI7dQNjQCkTCCltokF6li6XVKE';
  //   }

  //   axios.post(url, authData)
  //     .then((res) => {
  //       localStorage.setItem('token', res.data.idToken);
  //       const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
  //       localStorage.setItem('expirationDate', expirationDate);
  //       localStorage.setItem('userId', res.data.localId);
  //       dispatch(authSuccess(res.data));
  //       dispatch(checkAuthTimeout(res.data.expiresIn))
  //     })
  //     .catch((err) => {
  //       dispatch(authFail(err.response.data.error));
  //     });
  // };

  return {
    type: actionTypes.AUTH_USER,
    email,
    password,
    isSignup
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path
  };
};

export const authCheckState = () => {
  // return (dispatch) => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     dispatch(logout());
  //   } else {
  //     const expirationDate = new Date(localStorage.getItem('expirationDate'));
  //     if (expirationDate > new Date()) {
  //       const authData = {
  //         localId: localStorage.getItem('userId'),
  //         idToken: token
  //       }
  //       dispatch(authSuccess(authData));
  //       dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
  //     } else {
  //       dispatch(logout(token));
  //     }
  //   }
  // };
  return {
    type: actionTypes.AUTH_CHECK_STATE
  };
};