import React, { Component } from 'react';

class CommentBox extends Component {
    state = {
        comment: ''
    }

    textareaChangeHandler = (event) => {
        this.setState({
            comment: event.target.value
        });
    }

    formSubmitHandler = (event) => {
        event.preventDefault();

        this.setState({
            comment: ''
        });
    }

    render() {
        return (
            <form onSubmit={this.formSubmitHandler}>
                <h4>Add a Commnent</h4>
                <textarea 
                    onChange={this.textareaChangeHandler}
                    value={this.state.comment}/>
                <div>
                    <button>Submit Comment</button>
                </div>
            </form>
        );
    }
};

export default CommentBox;