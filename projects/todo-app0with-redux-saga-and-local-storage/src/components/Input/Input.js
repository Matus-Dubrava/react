import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Input.css';
import * as actions from '../../store/actions/index';

class Input extends Component {
    state = {
        value: ''
    }

    inputChangeHandler = (event) => {
        this.setState({ value: event.target.value });
    }

    todoAddHandler = () => {
        if (this.state.value !== '') {
            this.props.onTodoAdd(this.state.value);
        }
    }

    render() {
        return (
            <div className={classes.Input}>
                <input 
                    onChange={this.inputChangeHandler}
                    value={this.state.value}
                    placeholder="Add new task"
                    type="text" />

                <button
                    onClick={this.todoAddHandler}
                    >Add todo</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
};

const masDispatchToProps = (dispatch) => {
    return {
        onTodoAdd: (value) => dispatch(actions.todoAdd(value))   
    };
};

export default connect(mapStateToProps, masDispatchToProps)(Input);