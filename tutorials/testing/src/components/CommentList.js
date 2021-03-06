import React, { Component } from 'react';
import { connect } from 'react-redux';

class commentList extends Component {
    render() {
        const comments = this.props.comments.map((comment) => {
            return (
                <li key={comment}>
                    {comment}
                </li>
            );
        });
        
        return (
            <div>
                <h4>Comment List</h4>
                <ul>
                    {comments}
                </ul>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        comments: state.comments.comments
    };
};

export default connect(mapStateToProps)(commentList);