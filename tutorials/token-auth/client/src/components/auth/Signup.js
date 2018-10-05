import React, { Component } from 'react';
import { reduxForm , Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import * as actions from '../../store/actions';

class Signup extends Component {
    formSubmitHandler = (formProps) => {
        this.props.onSignup(formProps, () => {
            this.props.history.replace('/features');
        });
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
                <div>
                    {this.props.errorMessage}
                </div>
                <button>
                    Sign Up!
                </button>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage
    };
};

const mapDispatchToPorps = (dispatch) => {
    return {
        onSignup: (formProps, callback) => dispatch(actions.signup(formProps, callback))
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToPorps),
    reduxForm({ form: 'signup' })
)(Signup);
