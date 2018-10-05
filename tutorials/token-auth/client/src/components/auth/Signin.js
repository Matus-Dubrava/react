import React, { Component } from 'react';
import { reduxForm , Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import * as actions from '../../store/actions';

class Signin extends Component {
    formSubmitHandler = (formProps) => {
        this.props.onSignin(formProps, () => {
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
                    Sign In!
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
        onSignin: (formProps, callback) => dispatch(actions.signin(formProps, callback))
    };
};

export default compose(
    connect(mapStateToProps, mapDispatchToPorps),
    reduxForm({ form: 'signin' })
)(Signin);
