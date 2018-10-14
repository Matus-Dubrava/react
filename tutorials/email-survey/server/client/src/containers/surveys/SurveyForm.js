import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';

const FIELDS = [
    { name: 'title', label: 'Survey Title' },
    { name: 'subject', label: 'Subject Line' },
    { name: 'body', label: 'Email Body' },
    { name: 'emails', label: 'Recipient List' }
];

class SurveyForm extends Component {
    renderFields() {
        return _.map(FIELDS, ({ name, label }) => {
            return (
                <Field
                    key={name}
                    component={SurveyField}
                    type="text"
                    name={name}
                    label={label}
                />
            );
        });
    }

    render() {
        return (
            <div>
                <form
                    onSubmit={this.props.handleSubmit(values =>
                        console.log(values)
                    )}
                >
                    {this.renderFields()}

                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        className="teal btn-flat right white-text"
                    >
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.title) {
        errors.title = 'You must provide a title';
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm'
})(SurveyForm);