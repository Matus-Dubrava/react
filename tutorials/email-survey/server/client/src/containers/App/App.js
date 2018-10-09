import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../../containers/Header/Header';
import * as actions from '../../store/actions';

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

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

export default connect(
    null,
    mapDispatchToProps
)(App);
