import { takeEvery } from 'redux-saga/effects'; 

import * as actionTypes from '../actions/actionTypes';
import * as todoSagas from './todos';

export function* watchTodos() {
    yield takeEvery(actionTypes.TODO_ADD, todoSagas.todoAddSaga);
    yield takeEvery(actionTypes.TODOS_SET, todoSagas.todosSetSaga);
    yield takeEvery(actionTypes.TODO_REMOVE, todoSagas.todoRemoveSaga);
    yield takeEvery(actionTypes.TODO_COMPLETE, todoSagas.todoCompleteSage);
};
