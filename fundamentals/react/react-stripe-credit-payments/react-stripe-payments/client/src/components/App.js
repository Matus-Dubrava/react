import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header';
import * as actions from '../actions';

class App extends Component {
    componentDidMount() {
        this.props.onFetchUser();
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Header />
                </BrowserRouter>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth.auth
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchUser: () => dispatch(actions.fetchUser())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
