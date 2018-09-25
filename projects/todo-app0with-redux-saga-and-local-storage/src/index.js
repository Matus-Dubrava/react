import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import createSataMiddleware from 'redux-saga'; 

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as watchers from './store/sagas/index';
import todoReducer from './store/reducers/todos'; 

const rootReducer = combineReducers({
    todo: todoReducer
});

const sagaMiddleware = createSataMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(watchers.watchTodos);

const app = <Provider store={store}><App /></Provider>

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
