import * as actionTypes from '../actions/actionTypes';

const initialState = {
  token: null,
  email: null,
  userId: null,
  loading: false,
  expiresIn: null,
  error: null
};

const authInit = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null
  };
};

const authFail = (state, action) => {
  return {
    ...state,
    error: action.error,
    loading: false
  };
};

const authSuccess = (state, action) => {
  return {
    ...state,
    error: null,
    loading: false,
    token: action.token,
    userId: action.userId,
    expiresIn: action.expiresIn,
    email: action.email
  };
};

const logout = (state, action) => {
  return {
    ...state,
    token: null,
    userId: null,
    expiresIn: null,
    email: null
  };
};

const authAutoLogin = (state, action) => {
  return {
    ...state,
    token: action.token,
    userId: action.userId,
    expiresIn: action.expiresIn,
    email: action.email
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_INIT: return authInit(state, action);
    case actionTypes.AUTH_FAIL: return authFail(state, action);
    case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
    case actionTypes.LOGOUT: return logout(state, action);
    case actionTypes.AUTH_AUTO_LOGIN: return authAutoLogin(state, action);
    default: return state;
  }
};

export default reducer;