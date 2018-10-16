import React, { Component } from 'react';

import './auth.css';

import FIELDS from './signinFields';
import InputField from '../UI/InputField';

class Signin extends Component {
    state = FIELDS.reduce(
        (acc, field) => {
            acc[field.inputProps.name] = '';
            return acc;
        },
        { errors: [] }
    );

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    renderFields() {
        return FIELDS.map(({ inputProps, label }) => (
            <InputField
                changed={this.inputChangeHandler}
                value={this.state[inputProps.name]}
                key={inputProps.name}
                label={label}
                inputProps={inputProps}
                required
            />
        ));
    }

    formSubmitHandler = event => {
        event.preventDefault();

        if (!this.state.error) {
            // submit
        }
    };

    renderErrors() {
        return this.state.errors.map(err => (
            <li key={err} className="red-text">
                {err}
            </li>
        ));
    }

    render() {
        return (
            <div className="auth_form">
                <form onSubmit={this.formSubmitHandler}>
                    {this.renderFields()}
                    <ul className="red-text">{this.renderErrors()}</ul>
                    <button className="btn tiel white-text">Sign In</button>
                </form>
            </div>
        );
    }
}

export default Signin;
