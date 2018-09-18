# REDUX 

* [reducer](#reducer)
* [storing state](#storing-state)
* [combining multiple reducers](#combining-multiple-reducers)
* [connecting state and actions with react](#connecting-state-and-actions-with-react)
* [what are actions](#what-are-actions)
* [dispatching action from component](#dispatching-action-from-component)
* [dispatching action with payload](#dispatching-action-with-payload)
* [handling action in reducer](#passing-action-to-reducer)
* [handling action with payload](#handling-action-with-payload)
* [action creators](#-action-creators)
* [removing magic strings](#removing-magic-strings)

* [adding middleware](#adding-middleware)

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

Middleware is a function or a piece of code that sits between two other layers of software. In redux, middleware functions sits between component that dispatches a function and a reducer. If we want to use middleware, we need to import __applyMiddleware__ function from __redux__ and call it with middleware function as its argument in __createStore__ function. 

```javascript
import { createStore, applyMiddleware }

const logger = (store) => {
    return (next) => {
        return (action) => {
            const result = next(action);
            console.log(store.getState());
            return result;
        }
    }
}

const store = createStore(reducer, applyMiddleware(logger));
```

We can pass multiple middleware functions to __applyMiddleware__ that will then be proccessed one after another once the action is dispatched from component.

## connecting redux devtools with application

If we want to use redux devtools in our application then:

```javascript
import { createStore, applyMiddleware, compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(...middleware)));
```





