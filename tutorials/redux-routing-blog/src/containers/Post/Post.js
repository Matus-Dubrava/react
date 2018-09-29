import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Post.css';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

class Post extends Component {
    componentDidMount() {
        this.props.onPostFetch(this.props.match.params.id);
    }

    postDeleteHandler = (id) => {
        this.props.onPostDelete(id);
        this.props.history.replace('/');
    }

    render() {
        let post = <Spinner />;
        if (this.props.currentPost) {
            post = (
                <div>
                    <h3>{this.props.currentPost.title}</h3>
                    <p>{this.props.currentPost.categories}</p>
                    <p>{this.props.currentPost.content}</p>
                 <button
                    onClick={() => this.postDeleteHandler(this.props.currentPost.id)}
                    >Delete</button>
                </div>
            );
        }

        return (
            <React.Fragment>
                <Link 
                    to="/">go back</Link>
                {post}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        currentPost: state.posts.currentPost
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPostFetch: (id) => dispatch(actions.postFetch(id)),
        onPostDelete: (id) => dispatch(actions.postDelete(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);