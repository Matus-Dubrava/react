import React, { Component } from 'react';

import './App.css';
import './container/SearchBar/SearchBar';
import SearchBar from './container/SearchBar/SearchBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchBar />
      </div>
    );
  }
}

export default App;
