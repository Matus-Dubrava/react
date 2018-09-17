# REDUX 

## create a store
We need to import __createStore__ function from __redux__
which will create a store for our application.

<pre><code>
import { createStore } from 'redux';
</pre></code>

This function takes one argument that is a reducer (root reducer). 

<pre><code>
const reducer = 'path-to-reducer-file';
const store = createStore(reducer);
</pre></code>

We may have more than just one reducer but we need to combine them together into one before we it into the __createStore__ function.

<pre><code>
import { createStore, combineReducers } from 'redux';

const reducer1 = 'path-to-reducer-file1';
const reducer2 = 'path-to-reducer-file2';
const rootReducer = combineReducers({
    rd1: reducer1, 
    rd2: reducer2
});

const store = createStore(rootReducer);
</pre></code>

Here, __rd1__ and __rd2__ properties will be used as prefixes for state slices produced by respective reducer.

## create a reducer (start - reducer definition)

Reducer is just a simple JavaScript function that takes a state and an action and returns a new state (which should be done in an immutable fashion).

We need to define some initial state that represents our application's state and pass it as a default value for the state parameter of reducer function.

<pre><code>
const initialState = {
    counter: 0
};

const reducer = (state = initialState, action) => {
    return state;
};

export default reducer;
</pre></code>

This is an example of reducer file where the reducer we have defined just returns an unmodified state no matter what action we are passing to it.

## create a reducer (cont - pass an action)

Once we dispatch an action to the reducer, reducer will be called with __state__ which represents the current state of our application and __action__ which represents the type of action that we want to make.

In the next example we create a cases for two types of action that the reducer expects (increment and decrement).

<pre><code>
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
</pre></code>

## create a reducer (cont - remove magic strings)

__MAGIC STRING__ -- String that has some special meaning in our application (such as 'INCREMENT' in the case of our example). We should not use magic strings directly because they are easily mistyped and these kinds of errors are pretty hard to track down because we usually don't get any stack trace error.  

We can move those strings into separate file, let's say __actions.js__ were we can create an object and assign them to that object's properties, export that object and instead of using magic strings directly, we will call them by accessing proprties of the object. If we do that and accidentaly mistype the name of the string (name of property of object) then we will get the error which is much easier to track down and repair.

### actions.js 

<pre><code>
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
</pre></code>

### reducer.js

<pre><code>
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
</pre></code>

