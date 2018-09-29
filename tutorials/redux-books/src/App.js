import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import Books from './containers/Books/Books';
import FullBook from './containers/FullBook/FullBook';
import BookForm from './containers/BookFrom/BookForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Books />
        {this.props.addingNewBook 
          ? <BookForm />
          : <FullBook />}
      </div>
    );
  }
}

const masStateToProps = (state) => {
  return {
    addingNewBook: state.books.addingNewBook
  };
};

export default connect(masStateToProps)(App);
