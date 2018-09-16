import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import classes from './App.css';
import Navigation from './components/Navigation/Navigation';
import ContactData from './containers/ContactData/ContactData';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <Navigation />
        <Switch>
          <Route path="/users" component={ContactData} />
          <Route path="/" exact render={() => <h1>Welcome to home page</h1>} />
        </Switch>
      </div>
    );
  }
}

export default App;
