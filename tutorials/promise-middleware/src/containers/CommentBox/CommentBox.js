import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import requireAuth from '../../hoc/requireAuth';

class CommentBox extends Component {
    state = {
        commentValue: ''
    }

    inputChangedHandler = (event) => {
        this.setState({ commentValue: event.target.value });
    }

    formSubmitHandler = (event) => {
        event.preventDefault();

        this.props.onAddComment(this.state.commentValue);

        this.setState({ commentValue: '' });
    }

    render() {
        return (
            <div>
                <form
                    onSubmit={this.formSubmitHandler}>
                    <textarea 
                        className="form-control"
                        onChange={this.inputChangedHandler}
                        value={this.state.commentValue}
                        placeholder="Add new Comment" />
                    
                    
                    <button
                        className="btn btn-primary btn-block">Submit</button>
                </form>

                <button
                    onClick={this.props.onFetchComments}
                    className="btn btn-outline-secondary btn-block">
                    Fetch Comments
                </button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddComment: (comment) => dispatch(actions.addComment(comment)),
        onFetchComments: () => dispatch(actions.fetchComments())
    };
};

export default connect(null, mapDispatchToProps)(requireAuth(CommentBox));