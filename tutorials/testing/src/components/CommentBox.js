import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions';

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
        
        this.props.onAddComment(this.state.comment);
        
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

const mapDispatchToProps = (dispatch) => {
    return {
        onAddComment: (comment) => dispatch(actions.addComment(comment))
    };
};

export default connect(null, mapDispatchToProps)(CommentBox);