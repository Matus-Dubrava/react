import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Books from './containers/Books/Books';
import FullBook from './containers/FullBook/FullBook';
import BookForm from './containers/BookFrom/BookForm';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Books />
          <Switch>
            <Route path="/new-book" component={BookForm} />
            <Route path="/:id" component={FullBook} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const masStateToProps = (state) => {
  return {
    addingNewBook: state.books.addingNewBook
  };
};

export default connect(masStateToProps)(App);
