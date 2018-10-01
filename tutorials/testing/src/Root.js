import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
// import reduxPromise from 'redux-promise';
import thunk from 'redux-thunk';

import rootReducer from './store/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (props) => {
    return (
        <Provider 
            store={createStore(
                rootReducer, 
                props.initialState, 
                composeEnhancers(applyMiddleware(thunk))
            )}>
            {props.children}
        </Provider>
    );
};