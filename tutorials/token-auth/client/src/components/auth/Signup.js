import React, { Component } from 'react';
import { reduxForm , Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import * as actions from '../../store/actions';

class Signup extends Component {
    formSubmitHandler = (formProps) => {
        this.props.onSignup(formProps)
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.formSubmitHandler)}>
                <fieldset>
                    <label>Email</label>
                    <Field 
                        autoComplete="none"
                        component="input"
                        type="email"
                        name="email" />
                </fieldset>
                <fieldset>
                    <label>Password</label>
                    <Field 
                        autoComplete="none"
                        component="input"
                        type="password"
                        name="password" />
                </fieldset>
                <button>
                    Sign Up!
                </button>
            </form>
        );
    }
}

const mapDispatchToPorps = (dispatch) => {
    return {
        onSignup: (formProps) => dispatch(actions.signup(formProps))
    };
};

export default compose(
    connect(null, mapDispatchToPorps),
    reduxForm({ form: 'signup' })
)(Signup);
