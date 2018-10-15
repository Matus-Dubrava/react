import React from 'react';
import { connect } from 'react-redux';

import formFields from './formFields';
import * as actions from '../../store/actions';

const SurveyFormReview = ({ onCancel, formValues, onSubmitSurvey }) => {
    const reviewFields = formFields.map(({ name, label }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    });

    return (
        <div>
            <h5>Please confirm entries</h5>
            {reviewFields}
            <button
                onClick={onCancel}
                className="btn-flat darken-3 yellow white-text"
            >
                Back
            </button>
            <button
                onClick={() => onSubmitSurvey(formValues)}
                className="btn-flat right green white-text"
            >
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        formValues: state.form.surveyForm.values
    };
};

const mapDispatchToActions = dispatch => {
    return {
        onSubmitSurvey: values => dispatch(actions.submitSurvey(values))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToActions
)(SurveyFormReview);
