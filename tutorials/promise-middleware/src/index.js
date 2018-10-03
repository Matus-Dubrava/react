import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { compose, applyMiddleware, createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';

import rootReducer from './store/reducers';
import App from './containers/App/App';
import asyncMiddleware from './middlewares/async.js';
import stateValidatorMiddleware from './middlewares/stateValidator';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(asyncMiddleware, stateValidatorMiddleware)));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));