import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';

class SurveyList extends Component {
    componentDidMount() {
        this.props.onFetchSurveys();
    }

    renderSurveys() {
        return this.props.surveys.reverse().map(survey => (
            <div key={survey._id} className="card darken-1">
                <div className="card-content">
                    <span className="card-title">{survey.title}</span>
                    <p>{survey.body}</p>
                    <p className="right">
                        Sent On:{' '}
                        {new Date(survey.dateSent).toLocaleDateString()}
                    </p>
                </div>
                <div className="card-action">
                    <a href="#">Yes: {survey.yes}</a>
                    <a href="#">No: {survey.no}</a>
                </div>
            </div>
        ));
    }

    render() {
        return <div>{this.renderSurveys()}</div>;
    }
}

const mapStateToProps = state => {
    return {
        surveys: state.survey
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchSurveys: () => dispatch(actions.fetchSurveys())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SurveyList);
