import React, { Component } from 'react';
import axios from '../../../axios';
import { Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        axios.get('/posts')
            .then((response) => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map((post) => {
                    return {...post, author: 'Max' };
                });
                this.setState({ posts: updatedPosts });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    postSelectedHandler = (id) => {
        this.setState({ selectedPostId: id });
        this.props.history.push({ pathname: '/posts/' + id });
    }

    render() {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong</p>
        if (!this.state.error) {
            posts = this.state.posts.map((post) => {
                return (

                    <Post 
                        key={post.id}
                        clicked={this.postSelectedHandler.bind(this, post.id)}
                        author={post.author}
                        title={post.title} />
                );
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route
                    component={FullPost} 
                    path={this.props.match.url + '/:id'} exact />
            </div>
        );
    }
}

export default Posts;