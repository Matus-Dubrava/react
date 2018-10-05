import React, { Component } from 'react';
import { reduxForm , Field } from 'redux-form';

class Signup extends Component {
    formSubmitHandler = (formProps) => {
        console.log(formProps);
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

export default reduxForm({ form: 'signup' })(Signup);