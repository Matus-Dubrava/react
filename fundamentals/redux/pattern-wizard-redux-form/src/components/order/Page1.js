import React from 'react';
import { Field, reduxForm } from 'redux-form';

import OrderField from './OrderField';
import page1Fields from './page1Fields';

const Page1 = props => {
    const renderFields = page1Fields.map(({ name, type, label }) => (
        <Field
            key={name}
            type={type}
            name={name}
            label={label}
            component={OrderField}
        />
    ));

    return (
        <div>
            <h5>1/3</h5>
            <form onSubmit={props.handleSubmit(props.onContinue)}>
                {renderFields}
                <button
                    onClick={props.onCancel}
                    type="button"
                    className="btn red darken3 white-text left"
                >
                    <i className="material-icons left">arrow_back</i>
                    Cancel
                </button>
                <button type="submit" className="btn tiel white-text right">
                    <i className="material-icons right">done</i>
                    Continue
                </button>
            </form>
        </div>
    );
};

function validate(values) {
    const errors = {};

    page1Fields.forEach(field => {
        if (!values[field.name] || !values[field.name].length) {
            errors[field.name] = 'Field is required';
        }
    });

    return errors;
}

export default reduxForm({
    form: 'orderForm',
    validate,
    destroyOnUnmount: false
})(Page1);
