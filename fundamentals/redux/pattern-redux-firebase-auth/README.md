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

__authAutoLogin__

This action is dispatched from the root component once that component is mounted to check whether we do have valid credentials stored in *localStorage* that could be used. If that is the case, then this action dispatches __authSuccess__
action that populates redux state with the credentials. It also sets automatic logout once the token expires.

```javascript
export const authAutoLogin = (email, userId, expiresIn, token) => {
  return (dispatch) => {
    dispatch(authSuccess(token, email, userId, expiresIn));

    setTimeout(() => {
      dispatch(logout());
    }, +expiresIn * 1000);
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
 
## auth component

We are using react state here to handle form input fields' values two way data binding.

```javascript
state = {
  formElements: {
    email: {
      value: ''
    },
    password: {
      value: ''
    }
  }
}

inputChangeHandler = (event, field) => {
  const formElements = {...this.state.formElements};
  const element = {...this.state.formElements[field]};
  element.value = event.target.value;
  formElements[field] = element;

  this.setState({ formElements });
}
```

We are calling __authHandler__ when we click submit button which then calls __onAuth__ functiom, which is the function defined in our actions under name __auth__. Here we can't call __onAuth__ direcly because that would cause our page to reload as that is the default behaviour of form submittion. Therefore, we need to wrap it with another function and call
*event.preventDefault()* as a part of it.

```javascript
authHandler = (event) => {
  event.preventDefault();

  this.props.onAuth(
    this.state.formElements.email.value,
    this.state.formElements.password.value
  );
}
```

In render method, we conditionally render auth form, based on the loading state obtained from redux. If the loading is set to true, which means that the authentication ajax call is currenly being proccessed, we want to show spinner (or some other info so that user knows that our application is doing some proccessing). Otherwise we render the form.

We are also conditionally rendering error message inside of the form if there was some error with request.

```javascript
render() {
  let error = null;
  if (this.props.error) {
    error = <p className={classes.Error}>{this.props.error.message}</p>
  }

  let form = <Spinner />
  if (!this.props.loading) {
    form = (
      <form onSubmit={this.authHandler}>
        {error}
        <input 
          type="email"
          onChange={(event) => this.inputChangeHandler(event, 'email')}
          value={this.state.formElements.email.value}
          className={classes.InputFst}
          placeholder="E-Mail" />

        <input
          type="password"
          onChange={(event) => this.inputChangeHandler(event, 'password')}
          value={this.state.formElements.password.value}
          className={classes.InputSnd}
          placeholder="Password" />

        <button className={classes.BtnLogin}>Login</button>
        <button className={classes.BtnCreateAccount}>Create Account</button>
      </form>
    );
  }

  return (
    <section className={classes.Auth}>
      <div className={classes.Logo}></div>
      <h2>Member Login</h2>
      {form}
    </section>
  );
}
```

And as mentioned, we need to get __loading__ and __error__ state from redux as well as __auth__ function from *actions* file.

```javascript
const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProsp = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  };
};
```

## root component

Here we are trying to automatically log user in if there are valid credentials stored inside of *localStorage*. We are handling this logic in *componentDidMount* method.

```javascript
componentDidMount() {
  this.onTryAutoLogin();
}

onTryAutoLogin = () => {
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  const expiresIn = localStorage.getItem('expirationDate');
  const userId = localStorage.getItem('userId');
  const expiresInEpochTime = new Date(expiresIn).getTime();

  if (token && expiresInEpochTime > Date.now()) {
    const remainingTime = Math.floor((expiresInEpochTime - Date.now()) / 1000);
    this.props.onAuthAutoLogin(email, userId, remainingTime, token);
  }
};
```

And for that, we need to get the __authAutoLogin__ action from our *actions* file.

```javascript
const mapDispatchToProps = (dispatch) => {
  return {
    onAuthAutoLogin: (email, userId, expiresIn, token) => dispatch(actions.authAutoLogin(email, userId, expiresIn, token))
  };
};
```









