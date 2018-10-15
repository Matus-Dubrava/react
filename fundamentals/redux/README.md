# REDUX 

-   [reducer](#reducer)
-   [storing state](#storing-state)
-   [combining multiple reducers](#combining-multiple-reducers)
-   [connecting state and actions with react](#connecting-state-and-actions-with-react)
-   [what are actions](#what-are-actions)
-   [dispatching action from component](#dispatching-action-from-component)
-   [dispatching action with payload](#dispatching-action-with-payload)
-   [handling action in reducer](#passing-action-to-reducer)
-   [handling action with payload](#handling-action-with-payload)
-   [action creators](#action-creators)
-   [removing magic strings](#removing-magic-strings)

*   [adding middleware](#adding-middleware)
  * [handling promises in middleware](#handling-promises-in-middleware)
  * [async action creators with redux thunk](#async-action-creators-with-redux-thunk)
-   [connecting redux devtools with application](#connecting-redux-devtools-with-application)
-   [passing initial state to store](#passing-initial-state-to-store)

-   [PATTERN: async data fetching with loading and error state handling](https://github.com/Matus-Dubrava/react/tree/master/fundamentals/redux/pattern-async-data-fetching-with-loading-and-error)
-   [PATTERN: redux authentication with firebase](https://github.com/Matus-Dubrava/react/tree/master/fundamentals/redux/pattern-redux-firebase-auth)
-   [PATTERN: handling async operations with redux-saga](https://github.com/Matus-Dubrava/react/tree/master/fundamentals/redux/pattern-async-data-fetching-redux-saga)
-   [PATTERN: wizard redux form](https://github.com/Matus-Dubrava/react/tree/master/fundamentals/redux/pattern-wizard-redux-form)

## reducer

Reducer is just a simple JavaScript function that takes a state and an action and returns a new state (which should be done in an immutable fashion).

We need to define some initial state that represents our application's state and pass it as a default value for the state parameter of reducer function.

```javascript
const initialState = {
    counter: 0
};

const reducer = (state = initialState, action) => {
    return state;
};

export default reducer;
```

This is an example of reducer file where the reducer we have defined just returns an unmodified state no matter what action we are passing to it.

## storing state

To store the state of our application, we need some kind of object where we store the actual data, a store.

We can create this store by importing __createStore__ function from redux and which takes one argument, that is a reducer, also called a root reducer because we can pass only one. If have more reducer than just one, we will need to combine them together before we create our store.

```javascript
import { createStore } from 'redux';

const reducer = 'path-to-our-reducer-file';
const store = createStore(reducer);
```

Next, we need to connect redux with our react application by importing __Provider__ component from react-redux module and wrap our app component with it, passing store constant created by __createStore__ function as a property to this component.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from 'path-to-app-component';

const reducer = 'path-to-our-reducer-file';
const store = createStore(reducer);

const app = <Provider store={store}><App /></Provider>
ReactDOM.render(app, document.querySelector('.container'));
```

## combining multiple reducers

We can split __reducer__ file to multiple files so that each reducer handles a specific piece of our application state. But __createStore__ function expects just one reducer, usually called root reducer. Because of this limitation, we need to combine our reducers into a single one by using function from __redux__ module called __combineReducers__ which takes one object as its argument. 

Inside of this object we create properties -- prefixes for a given reducer with the reducer as a value.

```javascript
import { createStore. combineReducers } from 'redux';

import App from 'path-to-app-component';

const reducer1 = 'path-to-reducer1-file';
const reducer2 = 'path-to-reducer2-file';
const rootReducer = combineReducers({
    rd1: reducer1,
    rd2: reducer2
});
const store = createStore(reducer);
```

## connecting state and actions with react

If we want to make state and actions, managed by redux, visible in some component, we need to import __connect__ function from __react-redux__ module which is a function that takes two functions as its arguments, first that maps redux state to names and the second one that maps actions to names both of which will be then accessible in our component via __props__. It then returns a higher order component with which we need to wrap our component. These two functions are usually named __mapStateToProps__ and __mapDispatchToProps__.

```javascript
import { connect } from 'react-redux';
import * as actions from 'path-to-actions-file';

class MyComponent exteds... {

};

const mapStateToProps = (state) => {
    return {
        counter: state.counter
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        increment: () => dispatch({ type: actions.INCREMENT }),
        decrement: () => dispatch({ type: actions.DECREMENT }),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyComponent)
```

## what are actions

Action is JavaScript object that gets passed to reducer. This object must have a __type__ property that is used by reducer to determine what piece of functionality should be executed. Optionally, action can also carry some payload, additional properties, that can be used inside of reducer function.

## dispatching action from component

Once we have connected our component with redux using __connect__ function from __react-redux__, we can then dispatch actions by accessing then via __this.props__

```javascript

// in component
<button onClick={this.props.increment}>Increment counter</button>

// in mapDispatchToProps
increment: () => dispatch({ type: actions.INCREMENT })
```
## dispatching action with payload

We can pass payload to action by adding additional properties to object passed to __dispatch__ function.

```javascript

const x = 10;

// in component
<button onClick={this.props.add.bind(this, x)}>Add 10 to counter</button>

// or alternatively 
<button onClick={() => this.props.add(x)}>Add 10 to counter</button>

// in mapDispatchToProps
add: (amount) => dispatch({ type: actions.INCREMENT, amount })
```

## handling action in reducer

Once we dispatch an action to the reducer, reducer will be called with __state__ which represents the current state of our application and __action__ which represents the type of action that we want to make.

In the next example we create a cases for two types of action that the reducer expects (increment and decrement).

```javascript
const initialState = {
    counter: 0
};

const reducer = (state = initialState, action) => {
    switch (action) {
        case ('INCREMENT'): 
            return {
                ...state,
                counter: state.counter + 1
            };
        case ('DECREMENT'):
            return {
                ...state,
                counter: state.counter - 1
            }
        default: 
            return state;
    }
};

export default reducer;
```

## handling action with payload

If we have dispatched action with payload, we can then access it in a reducer as a property of the action object.

```javascript
const reducer = (state = initialState, action) => {
    switch (action) {
        case ('ADD'): 
            return {
                ...state,
                counter: state.counter + action.amount
            };
        default: 
            return state;
    }
};
```

## action creators

Action creator is a simple function that return object that can be used as an argument for __dispatch__ function inside
of __mapDispatchToProps__ function. 

__actions.js__

```javascript
export const increment = (payload) => {
    return {
        type: INCREMENT,
        payload
    };
}
```

__in component file__

```javascript
import * as actions from 'path-to-actions.js';

const mapDispatchToProps = (dispatch) => {
    return {
        increment: dispatch(actions.increment);
    };
}
```

Diagram that shows data flow between react and redux.

![redux-flow](https://github.com/Matus-Dubrava/react/blob/master/fundamentals/redux/redux-flow.png)

## removing magic strings

__MAGIC STRING__ -- String that has some special meaning in our application (such as 'INCREMENT' in the case of our example). We should not use magic strings directly because they are easily mistyped and these kinds of errors are pretty hard to track down because we usually don't get any stack trace error.  

We can move those strings into separate file, let's say __actions.js__ were we can create an object and assign them to that object's properties, export that object and instead of using magic strings directly, we will call them by accessing proprties of the object. If we do that and accidentaly mistype the name of the string (name of property of object) then we will get the error which is much easier to track down and repair.

__actions.js__ 

```javascript
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
```

__reducer.js__

```javascript
import * as actionTypes from 'path-to-actions-file';

const initialState = {
    counter: 0
};

const reducer = (state = initialState, action) => {
    switch (action) {
        case (actionTypes.INCREMENT): 
            return {
                ...state,
                counter: state.counter + 1
            };
        case (actionTypes.DECREMENT):
            return {
                ...state,
                counter: state.counter - 1
            }
        default: 
            return state;
    }
};

export default reducer;
```

## adding middleware

In the previous section, we have mentioned that __redux-thunk__ is a middeware but what does that mean? Generally, middleware stands for piece of software or program or a simple function that sits between some two other layers of software.
In case of __redux__, middleware sits between the place from where the action is dispatched (action is dispatched by store usually from our react components) and the reducer. Purpose of such functions is to intercept the dispatched action and performs some logic before we let the action continue to another middleware or reducer. 

There might be several different middlewares waiting for the action which we usually refer to as a middleware stack and we can programatically create and control this stack of fuctions, their purpose and the order in which they get to handle the action if at all.

Ok, so why do we need any middleware? There are cases when we need to perform some logic for each action or for some set of actions such as logging, checking whether the state of the redux store was not corrupted, and probably the most common use case is to handle asynchronous actions that need to perform some IO operations such as fetching some data from a server.

Now that we have a clearer vision of what the middleware is and why to use it, let's look on how to actually create one and how to hook it up to our application.

The syntax of middleware function is a little bit overengineered in my opinion and possibly could have been made more clearer. We start by defining a function that will receive one argument - the actual redux store, this functio then returns another function that will again receive a single argument which is a __next__ method that I will explain in a moment and this function again returns, one more time, a function that will receive, again, one argument that is the action that has been dispatched.

```javascript
const someMiddlewareFunction = (store) => (next) => (action) => {
    // do some logic here before passing the action down the middleware stack 
    next(action);
    
    // do some logic here after the action has been sent away,
    // at this point, if the action is not asynchronous that is beeing wait for in further middleware functions,
    // the redux store is already updated
}
```

Again, the syntax is a litte awkward here, but it is what it is. What we should probably be concerned with is how we can structure the actual part of the code above that we have in our control. We should always call __next__ method, otherwise our action will be trapped here and reducer will not receive any, which in some cases for a certain type of actions might make a sence, but usually it is a logical error that will break your application.

If we want to modify the action object, we can create a new action and pass it to the call of __next__ method, but there is also another option what we can do here. We may check for some properties on that action, handle them accordingly and instead, modify/create new action and instead of passing the action down the middleware stack, we can call __store.dispatch__ method and pass the action object to it. This will dispatch a new action that is run through the whole middleware stack anew. Why we might want to do such thing will be more clear in a moment when we will look on how to handle async calls inside of action creators. Note that even if we are using the above mentioned dispatch method, we still need to use next somewhere inside of the same function to let the action pass through at some point.

### handling promises in middleware

Now we will look on how we can handle promise object that is a result of some async call inside of a custom middleware.
These are the steps that we are going to make.
* setup a middleware function
* check whether the __payload__ property (we are strictly defining this name here) exists and whether it is a promise or not (more preciselly, whether it is a thenable object - object with *then* method defined on it)
* if so, then we will unwrap this promise by calling a then method and then we will dispatch the actual data through the whole middleware stack one more time
* if the above is not the case, then we will simply pass the function down the line (down the middleware stack) by calling the __next__ method 
* export the function (assuming that we are defining it in a separate file)
* hook it up to our application by using __applyMiddleware__ function provided by __redux__ module

*async.js*
```javascript
export default (store) => (next) => (action) => {
    console.log('inside of a middleware');

    if (!action.payload || !action.payload.then) {
        return next(action);
    }

    action.payload.then((res) => {
        const newAction = {
            ...action,
            payload: res.data
        };

        return store.dispatch(newAction);
    })
};
```

*index.js*
```javascript
import { applyMiddleware, createStore } from 'redux';
...
import rootReducer from 'path-to-reducer-file';
import asyncMiddleware from 'path-to-above-async-file';

const store = createStore(rootReducer, applyMiddleware(asyncMiddleware));
```

And then we need to use the mentioned __payload__ property to pass the promise object from our action creator, through the middleware and finally to the reducer.

*actionCreator example - using axios*
```javascript
export const fetchComments = () => {
    const response = axios.get('https://jsonplaceholder.typicode.com/comments');

    return {
        type: actionTypes.FETCH_COMMENTS,
        payload: response
    };
};
```

Working example [here](https://github.com/Matus-Dubrava/react/tree/master/fundamentals/redux/pattern-promise-middleware)

### async action creators with redux thunk

In the previous section, we have seen how to handle promises returned by action creators. This approach has some limitations, such as we need to pass the payload only via __payload__ property (the name doesn't really matter here, but the fact is that we need to exactly specify which property will be a promise so that we can handle accordingly in the middleware). Another shortcomming is that error handling can't be performed inside of the action creator itself because we don't know it there. 

For these reasons, we might want to use something (some module) that let's us to handle async code directly inside of an action creator. There are several options and one of them is __redux-thunk__ module that allows us to use __dispatch__ function directly inside of action creator. If we wire ue the __redux-thunk__ middleware to our application, then we can not only return plain objects from action creators, but also a function that will be able to call the __dispatch__ function.

*actions.js*
```javascript
export const fetchUsers = () => dispatch => {
    axios.get('some-url')
        .then((res) => {
            dispatch({ type: FETCH_USERS_SUCCESS, users: res.data });
        })
        .catch((err) => {
            dispatch({ type: FETCH_USERS_FAIL, error: err });
        });
}
```
As we can see, handling errors is now possble thanks to the fact that we can resolve the promise directly inside of the action creator.

We can also use async/await syntax here to make the code look somewhat more synchronous and easy to read.

```javascript
export const fetchUser = () => async dispatch => {
    try {
        const response = await axios.get('/api/current_user');
        dispatch({ type: FETCH_USERS_SUCCESS, users: res.data });
    } catch (err) {
        dispatch({ type: FETCH_USERS_FAIL, error: err });
    }
};
```

Note that we are not limited to a single action dispatching inside such action creators. For example, we can choose to dispatch some init action immediatelly that will inform redux store that the async action has begun so that we can show some loading text or spinner to our users. And once the async action is done, or in other words, once the promise returned from async call has been resolved, we can then dispatch another action that will inform the redux store that we are done, here is the data and stop that spinner.

## connecting redux devtools with application

If we want to use redux devtools in our application then we need to add the follwing piece of code to our application.

```javascript
import { createStore, applyMiddleware, compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(...middleware)));
```

## passing initial state to store

Sometimes it might be useful to start our application with some data already loaded into state. Nice example is when we are using __jwt__ for authentication. We usually store the token and probably some other data as well in the __local storage__ of the browser and keep it there for making authenticated requests in future. If we store the token only in our redux state then every time user reloads a page (reloads the application), all the data from the store are gone. To keep the user logged in we need to retrieve the stored token once the application starts and use it to initialize the redux state.

Suppose that we have slice of state called __auth__ that has two properties (may have some other but we are not concerned with them right now) -- email and token, and assume that we have the two, same-named, entries stored in our __local storage__ under the __authData__ key.

In our root *index.js* file (or wherever we are calling the __createStore__ method), we need to retrieve the that token and email entries.

```javascript
let authData = { email: '', token: '' };
if (localStorage.getItem('authData')) {
    authData = JSON.parse(localStorage.getItem('authData'));
}
```

Now, we can pass it to the __createStore__ function as the second argument.

```javascript
const store = createStore(
    rootReducer, // our main reducer
    {
        auth: {
            email: authData.email,
            token: authData.token
        }
    },
    applyMiddleware(...)
);
```

We can make it a little bit nicer by creating a function and using it to retrive the data instead. While most probably we won't reuse this function anywhere else, we are giving a much stronger signal about our intent just by properly naming it.

```javascript
function tryAutoLogin() {
    let authData = { email: '', token: '' };
    if (localStorage.getItem('authData')) {
        authData = JSON.parse(localStorage.getItem('authData'));
    }
    return authData;
}

const store = createStore(
    rootReducer, 
    {
        auth: tryAutoLogin()
    },
    applyMiddleware(...)
);
```











