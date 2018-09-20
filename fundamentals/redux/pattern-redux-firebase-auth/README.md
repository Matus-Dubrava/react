## actions

We need to handle 5 action types
  * __AUTH_INIT__ initializes authentication process
  * __AUTH_SUCCESS__ dispatched when authentication was successful
  * __AUTH_FAIL__ dispatched when authentication failed
  * __LOGOUT__ logs user out
  * __AUTH_AUTO_LOGIN__ tries to log user in if there is valid token stored in localStorage
