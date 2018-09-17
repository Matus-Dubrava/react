# REDUX 

[create a reducer](##create-a-reducer)
[create a reducer - pass an action](##create-a-reducer:-pass-an-action)

## CREATE A REDUCER

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

## CREATE A REDUCER: pass an action

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

## create a reducer (cont. - remove magic strings)

__MAGIC STRING__ -- String that has some special meaning in our application (such as 'INCREMENT' in the case of our example). We should not use magic strings directly because they are easily mistyped and these kinds of errors are pretty hard to track down because we usually don't get any stack trace error.  

We can move those strings into separate file, let's say __actions.js__ were we can create an object and assign them to that object's properties, export that object and instead of using magic strings directly, we will call them by accessing proprties of the object. If we do that and accidentaly mistype the name of the string (name of property of object) then we will get the error which is much easier to track down and repair.

### actions.js 

```javascript
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
```

### reducer.js

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

## create a store

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



