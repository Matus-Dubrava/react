import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import SurveyNew from '../surveys/SurveyNew';
import Dashboard from '../../containers/Dashboard/Dashboard';
import Header from '../../containers/Header/Header';
import Landing from '../../containers/Landing/Landing';
import * as actions from '../../store/actions';

class App extends Component {
    componentDidMount() {
        this.props.onFetchUser();
    }

    render() {
        return (
            <div className="container">
                <Header />
                <Route path="/" component={Landing} exact />
                <Route path="/surveys" component={Dashboard} exact />
                <Route path="/surveys/new" component={SurveyNew} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchUser: () => dispatch(actions.fetchUser())
    };
};

export default withRouter(
    connect(
        null,
        mapDispatchToProps
    )(App)
);
