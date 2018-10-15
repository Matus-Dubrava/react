import React from 'react';
import { connect } from 'react-redux';

import formFields from './formFields';

const SurveyFormReview = ({ onCancel, formValues }) => {
    const reviewFields = formFields.map(field => {
        return (
            <div key={field.name}>
                <label>{field.label}</label>
                <div>{formValues[field.name]}</div>
            </div>
        );
    });

    return (
        <div>
            <h5>Please confirm entries</h5>
            {reviewFields}
            <button onClick={onCancel} className="btn-flat yellow darken-3">
                Back
            </button>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        formValues: state.form.surveyForm.values
    };
};

export default connect(mapStateToProps)(SurveyFormReview);
