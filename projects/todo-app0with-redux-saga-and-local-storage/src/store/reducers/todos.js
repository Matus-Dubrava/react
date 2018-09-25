import * as actionTypes from '../actions/actionTypes';

const initialState = {
    todos: []
};

const todosHaveBeenUpdated = (state, action) => {
    return {
        ...state,
        todos: action.todos
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TODO_HAS_BEEN_ADDED: return todosHaveBeenUpdated(state, action);
        case actionTypes.TODOS_HAVE_BEEN_SET: return todosHaveBeenUpdated(state, action);
        case actionTypes.TODO_HAS_BEEN_REMOVED: return todosHaveBeenUpdated(state, action);
        case actionTypes.TODO_HAS_BEEN_COMPLETED: return todosHaveBeenUpdated(state, action);
        default: return state;
    }
};

export default reducer;