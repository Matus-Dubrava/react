import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Posts.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Sinner/Spinner';

class Posts extends Component {
    componentDidMount() {
        this.props.onFetchPosts();
    }

    render() {
        let posts = <Spinner />
        if (!this.props.loading) {
            posts = this.props.posts.map((post) => {
                return (
                    <li
                        key={post.id}>
                        {post.title}
                    </li>
                );
            });
        }

        return (
            <div>
                {posts}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.posts.loading,
        posts: state.posts.posts
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchPosts: () => dispatch(actions.fetchPosts())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);