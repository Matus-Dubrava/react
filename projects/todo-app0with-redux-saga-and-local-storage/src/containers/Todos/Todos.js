import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Todos.css';
import * as actions from '../../store/actions/index';
import Todo from './Todo/Todo';

class Todos extends Component {
    componentDidMount() {
        this.props.onTodosSet();
    }

    render() {
        const todos = this.props.todos.map((todo) => {
            return (
                <Todo 
                    completed={todo.completed}
                    todoCompleted={() => this.props.onTodoComplete(todo.id)}
                    todoRemoved={() => this.props.onTodoRemove(todo.id)}
                    date={todo.id}
                    key={todo.id}
                    value={todo.value}/>
            );
        });
        return (
            <ul className={classes.Todos}>
                {todos}
            </ul>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todos: state.todo.todos
    };  
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTodosSet: () => dispatch(actions.todosSet()),
        onTodoRemove: (id) => dispatch(actions.todoRemove(id)),
        onTodoComplete: (id) => dispatch(actions.todoComplete(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);