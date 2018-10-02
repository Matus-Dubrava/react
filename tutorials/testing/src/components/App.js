import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import CommentBox from './CommentBox';
import CommentList from './CommentList';
import * as actions from '../store/actions';

class App extends Component {
    renderButton() {
        if (this.props.isAuthenticated) {
            return (
                <button 
                    onClick={() => this.props.toggleAuth(false)}>
                    Sign Out
                </button>
            );
        } else {
            return (
                <button 
                    onClick={() => this.props.toggleAuth(true)}>
                    Sign In
                </button>
            );
        }
    }

    renderHeader() {
        return (
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/post">Post A Comment</Link></li>
                <li>{this.renderButton()}</li>
            </ul>
        );
    }

    render() {
        return (
            <div>
                {this.renderHeader()}
                <Route path="/post" component={CommentBox} />
                <Route path="/" exact component={CommentList} />
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleAuth: (isAuthenticated) => dispatch(actions.toggleAuth(isAuthenticated)) 
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);