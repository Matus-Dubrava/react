import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Auth.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import * as actionCreators from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Passoword'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignup: true
  }

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = isValid && value.trim() !== '';
    }

    if (rules.minLength) {
      isValid = isValid && value.length >= rules.minLength;
    }

    if (rules.maxLength) {
      isValid = isValid && value.length <= rules.maxLength;
    }

    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[controlName]),
        touched: true
      }
    };

    this.setState({ controls: updatedControls });
  }

  submitHandler = (event) => {
    event.preventDefault();

    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  }

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return {
        isSignup: !prevState.isSignup
      };
    });
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <p>{this.props.error.message}</p>
      );
    }

    const form = formElementsArray.map((formElement) => (
      <Input
        touched={formElement.config.touched}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig} 
        value={formElement.config.value} />
        ));
        
      let formWrapper = <Spinner />
      if (!this.props.loading) {
        formWrapper = (
          <div className={classes.Auth}>
            {errorMessage}
            <form onSubmit={this.submitHandler}>
              {form}
              <Button btnType="Success">Submit</Button>
            </form>
            <Button   
              clicked={this.switchAuthModeHandler}
              btnType="Danger" >
              SWITH TO {this.state.isSignup ? 'SIGNIN': 'SIGNUP'}</Button>
          </div>
      );
    }


    return formWrapper;
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    error: state.auth.error,
    userId: state.auth.userId,
    loading: state.auth.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actionCreators.auth(email, password, isSignup))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);