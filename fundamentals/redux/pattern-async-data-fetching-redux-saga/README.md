Redux Saga module provides us with middleware capable of handling async operations such as AJAX calls or timers. Instead of placing side effect into our action creator, we move them to so called sagas which are generator functions that are used to handle these side effects. Therefore our action creators can stay pure, unlike in case of using middleware provided by *redux-thunk* module.

In this section, we will look on how to transform code that uses *redux-thunk* middleware into one that uses *redux-saga*. Important note here, we can still use *redux-thunk* with *redux-saga* at the same time.

First we need to install redux-saga - __npm install --save redux-saga__

## handling async operations with redux-thunk

Now let's look on the code that we migth produce when we want to make an ajax call to fetch some data from a server (here I am using *axios* module but feel free to use any other alternative such as *fetch* function provided directly by JavaScript). First we define our action creators which are functions that return an action which is a plain javascript object with type property describing type of the action and possibly some payload. In addition to defining our actions, I will also create a new file called *index.js* inside of */store/actions* folder that will store all the actions exported from file in which we define action creators (*posts.js*).

```javascript
export {
    fetchPosts,
    fetchPostsInit,
    fetchPostsSuccess,
    fetchPostsFail
} from './posts';
```

These will be the actions exported from *posts.js*. Next I will create a file called *actionTypes.js* inside of actions folder to store all the magic strings (types of actions).

```javascript
export const FETCH_POSTS_INIT = 'FETCH_POSTS_INIT';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAIL = 'FETCH_POSTS_FAIL';
export const FETCH_POSTS = 'FETCH_POSTS';
```

Then we need a file where we will store our reducer.

```javascript
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    posts: [],
    loading: false,
    error: null
};

const fetchPostsInit = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null
    };
};

const fetchPostsSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: false,
        posts: action.posts
    };
};

const fetchPostsFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_POSTS_INIT: return fetchPostsInit(state, action);
        case actionTypes.FETCH_POSTS_SUCCESS: return fetchPostsSuccess(state, action);
        case actionTypes.FETCH_POSTS_FAIL: return fetchPostsFail(state, action);
        default: return state;
    }
};

export default reducer;
```

And a file where we define the actual action creators.

```javascript
import * as actionTypes from './actionTypes';

export const fetchPostsInit = () => {
    return {
        type: actionTypes.FETCH_POSTS_INIT
    };
};

export const fetchPostsSuccess = (posts) => {
    return {
        type: actionTypes.FETCH_POSTS_SUCCESS,
        posts
    };
};

export const fetchPostsFail = (error) => {
    return {
        type: actionTypes.FETCH_POSTS_FAIL,
        error
    };
};

export const fetchPosts = () => {
    return (dispatch) => {
        dispatch(fetchPostsInit());

        axios.get('https://jsonplaceholder.typicode.com/todos')
             .then((res) => {
                 dispatch(fetchPostsSuccess(res.data));
              })
              .catch((err) => {
                  dispatch(fetchPostsFail(err));
              });
       };
};

```

And that is the basic setup using redux-thunk. 

## turning to redux-saga

Here we are moving the logic from *fetchPosts* action creator function defined in *store/actions/posts.js* to *store/sagas/posts.js* where we define our saga generator function. We can keep the rest of the action creators untouched because the are already pure. 

*/store/sagas/posts.js*

```javascript
import axios from 'axios';
import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';

export function* fetchPostsSaga(action) {
    yield put(actions.fetchPostsInit());

    try {
        const res = yield axios.get('https://jsonplaceholder.typicode.com/todos');
        yield put(actions.fetchPostsSuccess(res.data));
    } catch (err) {
        yield put(actions.fetchPostsFail(err));
    }   
};
```

updated */store/actions/posts.js*

```javascript
export const fetchPosts = () => {
    return {
        type: actionTypes.FETCH_POSTS
    }
};
```

In our updated action creator, we have removed the impure part and we are now returning a new action object with a new type of action *FETCH_POSTS* which we will intercept by middleware from *redux-saga*.

Next we need a so-called watcher function which is basically a mapping between *saga* functions and *dispatched actions* where we specify which action should be handled by which saga function. For that we create a new file inside of our saga folder called again, *index.js*.

```javascript
import { takeEvery } from 'redux-saga/effects'; 

import { fetchPostsSaga } from './posts';
import * as actionTypes from '../actions/actionTypes';

export function* watchPosts() {
    yield takeEvery(actionTypes.FETCH_POSTS, fetchPostsSaga);
};

export default watchPosts;
```

Last thing we need to do is to set up our *redux-saga* middleware and hook up the above defined watcher function to it.
We will do this inside of *index.js* file defined in a root of our application.

*/index.js*

```javascript
import createSagaMiddleware from 'redux-saga';
import * as watcher from './store/sagas/index';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watcher.watchPosts);
```

With this setup, we are now able to call *fetchPosts* action creator in *mapDispatchToProps* callback and use it the same way as before.






