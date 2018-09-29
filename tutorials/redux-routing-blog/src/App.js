import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css';
import Posts from './containers/Posts/Posts';
import Post from './containers/Post/Post';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route path="/posts/:id" component={Post} />
            <Route path="/" component={Posts} exact />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
