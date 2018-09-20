## actions

We need to handle 5 action types
  * __AUTH_INIT__ initializes authentication process
  * __AUTH_SUCCESS__ dispatched when authentication was successful
  * __AUTH_FAIL__ dispatched when authentication failed
  * __LOGOUT__ logs user out
  * __AUTH_AUTO_LOGIN__ tries to log user in if there is valid token stored in localStorage
  
## action creators

__authInit__ 

```javascript
export const authInit = () => {
  return {
    type: actionTypes.AUTH_INIT
  };
};
```

__authSuccess__

```javascript
export const authSuccess = (token, email, userId, expiresIn) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    email,
    token,
    expiresIn,
    userId
  };
};
```

__authFail__

```javascript
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};
```

__auth__

This action is the one that is called from component and dispatches the previous actions as neccessary.
Once this function is called, it immediatelly dispatches __authInit__ to indicate the start of authentication proccess.
If authentication was successful, it dispatches __authSuccess__ and also stores credentials in *localStorage* if authentication was successful, otherwise it dispatches __authFail__. 

Optional, we are dispatching __logout__ action one the token expires using *setTimeout*.

```javascript
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
```
__logout__

Removes all auth data from *localStorage* and returns __logout__ action type.

```javascript
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');

  return {
    type: actionTypes.LOGOUT
  };
};
```

## auth reducer

In our auth reducer's slice of state, we are storing these properties
  * token 
  * email
  * userId
  * loading
  * expiresIn
  * error
  
 ```javascript
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
 ```



