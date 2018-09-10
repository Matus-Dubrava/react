import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Person.css';
import withClass from '../../hoc/WithClass';

class Person extends Component {
  state = {
    inputValue: this.props.name
  };

  componentWillMount() {
    console.log('[Person.js] inside componentWillMount');
  }

  componentDidMount() {
    console.log('[Person.js] inside componentDidMount');
  }

  inputChangeHandler = (event) => {
    this.setState({ inputValue: event.target.value });
    this.props.nameChangedHandler(event.target.value, this.props.id);
  };

  render() {
    console.log('[Person.js] inside render');

    return (
      <React.Fragment>
        <p 
          onClick={this.props.deletePersonHandler.bind(this, this.props.id)} >
          I am {this.props.name} and I am {this.props.age} yeas old.
        </p>
        <input 
          type="text"
          value={this.state.inputValue}
          onChange={(event) => {
            this.inputChangeHandler(event);
          }} />
      </React.Fragment>
    );
  } 
}

Person.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  age: PropTypes.number.isRequired,
  deletePersonHandler: PropTypes.func.isRequired,
  nameChangedHandler: PropTypes.func.isRequired
};

export default withClass(Person, classes.Person);