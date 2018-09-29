import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Posts.css';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

class Posts extends Component {
    componentDidMount() {
        this.props.onPostsFetch();
    }

    render() {
        let posts = <Spinner />
        if (this.props.posts.length) {
            posts = this.props.posts.map((post) => {
                return (
                    <Link 
                        style={{
                            textDecoration: 'none',
                            color: '#333'
                        }}
                        to={'/posts/' + post.id}
                        key={post.id}>
                        <li className="posts__item">
                            {post.title}
                        </li>
                    </Link>
                );
            });
        }

        return (
            <ul className="posts">
                {posts}
            </ul>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state.posts.posts
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPostsFetch: () => dispatch(actions.postsFetch())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Posts);