import React, { Component } from 'react';

class InputBox extends Component {
    state = {
        inputValue: ''
    }

    inputChangeHandler = (event) => {
        this.setState({ inputValue: event.target.value });
    }

    formSubmitHandler = (event) => {
        event.preventDefault();

        this.setState({ inputValue: '' });
    }

    render() {
        return (
            <form onSubmit={this.formSubmitHandler}>
                <input 
                    onChange={this.inputChangeHandler}
                    value={this.state.inputValue} />
                <button>Submit</button>
            </form>
        );
    }
}

export default InputBox;