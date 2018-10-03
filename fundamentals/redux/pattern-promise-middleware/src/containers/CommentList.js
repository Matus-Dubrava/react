import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../store/actions';

class CommentList extends Component {
    renderComments() {
        return this.props.comments.map((comment) => {
            return (
                <li key={comment}>
                    {comment}
                </li>
            );
        });
    }

    render() {
        return (
            <div>
                <button
                    onClick={this.props.onFetchComments}>
                    Get Comments
                </button>
                <ul>
                    {this.renderComments()}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments.comments
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchComments: () => dispatch(actions.fetchComments())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);