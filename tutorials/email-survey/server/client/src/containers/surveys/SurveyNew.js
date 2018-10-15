import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    state = {
        showReview: false
    };

    renderContent() {
        return this.state.showReview ? (
            <SurveyFormReview
                onCancel={() => this.setState({ showReview: false })}
            />
        ) : (
            <SurveyForm
                onSurveySubmit={() => this.setState({ showReview: true })}
            />
        );
    }

    render() {
        return <div>{this.renderContent()}</div>;
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);
