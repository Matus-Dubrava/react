import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './containers/App';
import rootReducer from './store/reducers';
import asyncMiddleware from './middlewares/async';

const store = createStore(rootReducer, applyMiddleware(asyncMiddleware));

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));