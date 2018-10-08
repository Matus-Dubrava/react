import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Header from '../../containers/Header/Header';

const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;
const Landing = () => <h2>Landing</h2>;

class App extends Component {
    render() {
        return (
            <div>
                <Header />
                <Route path="/" component={Landing} exact />
                <Route path="/surveys" component={Dashboard} exact />
                <Route path="/surveys/new" component={SurveyNew} />
            </div>
        );
    }
}

export default App;
