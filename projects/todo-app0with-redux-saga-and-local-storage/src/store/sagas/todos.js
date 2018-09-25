import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';

export function* todoAddSaga(action) {
    const todos = yield JSON.parse(localStorage.getItem('todos')) || [];
    const id = Date.now();
    const todo = { 
        value: action.value,
        completed: false,
        id
    };

    todos.push(todo);
    yield localStorage.removeItem('todos');
    yield localStorage.setItem('todos', JSON.stringify(todos));

    yield put(actions.todoHasBeenAdded(todos));
};

export function* todosSetSaga(action) {
    const todos = yield JSON.parse(localStorage.getItem('todos')) || [];
    
    yield put(actions.todoHasBeenAdded(todos));
};

export function* todoRemoveSaga(action) {
    const todos = yield JSON.parse(localStorage.getItem('todos')) || [];
    const newTodos = todos.filter((todo) => todo.id !== action.id);
    yield localStorage.removeItem('todos');
    yield localStorage.setItem('todos', JSON.stringify(newTodos));


    yield put(actions.todoHasBeenRemoved(newTodos));
};

export function* todoCompleteSage(action) {
    const todos = yield JSON.parse(localStorage.getItem('todos')) || [];
    const newTodos = todos.filter((todo) => todo.id !== action.id);
    const updatedTodo = todos.find((todo) => todo.id === action.id);

    updatedTodo.completed = true;
    newTodos.push(updatedTodo);
    newTodos.sort((a, b) => a.id > b.id);

    yield localStorage.removeItem('todos');
    yield localStorage.setItem('todos', JSON.stringify(newTodos));

    yield put(actions.todoHasBeenCompleted(newTodos));
};