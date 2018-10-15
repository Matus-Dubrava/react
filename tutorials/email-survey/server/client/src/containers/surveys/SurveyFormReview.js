import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import formFields from './formFields';
import * as actions from '../../store/actions';

const SurveyFormReview = ({
    onCancel,
    formValues,
    onSubmitSurvey,
    history
}) => {
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
                onClick={() =>
                    onSubmitSurvey(formValues, () => {
                        history.replace('/surveys');
                    })
                }
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
        onSubmitSurvey: (values, callback) =>
            dispatch(actions.submitSurvey(values, callback))
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToActions
    )(SurveyFormReview)
);
