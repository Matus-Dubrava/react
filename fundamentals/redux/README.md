# REDUX 

## create a root reducer
First we need to create a reducer that will be responsible for returning slices of state for our application based on the type of dispatched actions.

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

## create a reducer

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