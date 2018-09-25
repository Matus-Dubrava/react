import * as actionTypes from './actionTypes';

export const todoAdd = (value) => {
    return {
        type: actionTypes.TODO_ADD,
        value
    };
};

export const todoHasBeenAdded = (todos) => {
    return {
        type: actionTypes.TODO_HAS_BEEN_ADDED,
        todos
    };
};

export const todosSet = () => {
    return {
        type: actionTypes.TODOS_SET
    };
};

export const todosHaveBeenSet = (todos) => {
    return {
        type: actionTypes.TODOS_HAVE_BEEN_SET,
        todos
    };
};

export const todoRemove = (id) => {
    return {
        type: actionTypes.TODO_REMOVE,
        id
    };
};

export const todoHasBeenRemoved = (todos) => {
    return {
        type: actionTypes.TODO_HAS_BEEN_REMOVED,
        todos
    };
};

export const todoComplete = (id) => {
    return {
        type: actionTypes.TODO_COMPLETE,
        id
    };
};

export const todoHasBeenCompleted = (todos) => {
    return {
        type: actionTypes.TODO_HAS_BEEN_COMPLETED,
        todos
    };
};