import React, { Component } from 'react';
import { connect } from 'react-redux';

class CommentList extends Component {
    renderComments() {
        return this.props.comments.map((comment) => {
            return (
                <li
                    className="list-group-item"
                    key={comment.id}>
                    {comment.name}
                </li>
            );
        });
    }

    render() {
        return (
            <ul
                className="list-group">    
                {this.renderComments()}
            </ul>
        );
    }
}

const mapStataToProps = (state) => {
    return {
        comments: state.comments.comments
    };
};

export default connect(mapStataToProps)(CommentList);