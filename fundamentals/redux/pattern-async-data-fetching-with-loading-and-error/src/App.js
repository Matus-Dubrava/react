import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';
import * as actionCreators from './store/actions';

class App extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    let data = <p>Loading...</p>

    if (this.props.error) {
      data = <p>{this.props.error}</p>
    } else if (!this.props.loading && this.props.data) {
      data = this.props.data.map((d) => {
        return <li key={d.id}>{d.title}</li>;
      });

      data = <ul>{data}</ul>
    }

    return (
      <div className="App">
        {data}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    data: state.data,
    error: state.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(actionCreators.fetchData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
