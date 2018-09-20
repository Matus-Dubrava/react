import React, { Component } from 'react';
import { connect } from 'react-redux'; 

import './App.css';
import Auth from './containers/Auth/Auth';
import Hero from './components/Hero/Hero';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount() {
    this.onTryAutoLogin();
  }

  onTryAutoLogin = () => {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    const expiresIn = localStorage.getItem('expirationDate');
    const userId = localStorage.getItem('userId');
    const expiresInEpochTime = new Date(expiresIn).getTime();

    if (token && expiresInEpochTime > Date.now()) {
      const remainingTime = Math.floor((expiresInEpochTime - Date.now()) / 1000);
      this.props.onAuthAutoLogin(email, userId, remainingTime, token);
    }
  };

  render() {
    let page = <Auth />
    if (this.props.email) {
      page = (
        <Hero 
          onLogout={this.props.onLogout}
          email={this.props.email} />
      );
    }

    return (
      <div className="App">
        {page}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthAutoLogin: (email, userId, expiresIn, token) => dispatch(actions.authAutoLogin(email, userId, expiresIn, token)),
    onLogout: () => dispatch(actions.logout())
  };
};

const mapStateToProps = (state) => {
  return {
    email: state.auth.email
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
