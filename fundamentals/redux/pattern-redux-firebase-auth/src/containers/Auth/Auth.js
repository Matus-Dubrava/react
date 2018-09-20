import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Auth.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

class Auth extends Component {
  state = {
    formElements: {
      email: {
        value: ''
      },
      password: {
        value: ''
      }
    }
  }

  inputChangeHandler = (event, field) => {
    const formElements = {...this.state.formElements};
    const element = {...this.state.formElements[field]};
    element.value = event.target.value;
    formElements[field] = element;
    
    this.setState({ formElements });
  }

  authHandler = (event) => {
    event.preventDefault();

    this.props.onAuth(
      this.state.formElements.email.value,
      this.state.formElements.password.value
    );
  }

  render() {
    let error = null;
    if (this.props.error) {
      error = <p className={classes.Error}>{this.props.error.message}</p>
    }

    let form = <Spinner />
    if (!this.props.loading) {
      form = (
        <form onSubmit={this.authHandler}>
          {error}
          <input 
            type="email"
            onChange={(event) => this.inputChangeHandler(event, 'email')}
            value={this.state.formElements.email.value}
            className={classes.InputFst}
            placeholder="E-Mail" />

          <input
            type="password"
            onChange={(event) => this.inputChangeHandler(event, 'password')}
            value={this.state.formElements.password.value}
            className={classes.InputSnd}
            placeholder="Password" />

          <button className={classes.BtnLogin}>Login</button>
          <button className={classes.BtnCreateAccount}>Create Account</button>
        </form>
      );
    }

    return (
      <section className={classes.Auth}>
        <div className={classes.Logo}></div>
        <h2>Member Login</h2>
        {form}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProsp = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProsp)(Auth);