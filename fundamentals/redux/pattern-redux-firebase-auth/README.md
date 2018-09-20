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

Removes all auth data from *localStorage* and returns __logout__ action type

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



