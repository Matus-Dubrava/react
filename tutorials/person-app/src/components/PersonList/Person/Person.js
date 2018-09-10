import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Person.css';
import withClass from '../../hoc/WithClass';
import { AuthContext } from '../../../containers/App';

class Person extends Component {
  constructor(props) {
    super(props);
    console.log('[Person.js] inside Constructor');
    this.inputElement = React.createRef();
  }

  state = {
    inputValue: this.props.name
  };

  componentWillMount() {
    console.log('[Person.js] inside componentWillMount');
  }

  componentDidMount() {
    console.log('[Person.js] inside componentDidMount');
    if (this.props.position === 0) { this.inputElement.current.focus(); }
  }

  inputChangeHandler = (event) => {
    this.setState({ inputValue: event.target.value });
    this.props.nameChangedHandler(event.target.value, this.props.id);
  };

  focus() {
    this.inputElement.current.focus();
  }

  render() {
    console.log('[Person.js] inside render');

    return (
      <React.Fragment>
        <AuthContext.Consumer>
        { (auth) => auth
                      ? <p>I am authenticated</p>
                      : null}
        </AuthContext.Consumer>
        <p 
          onClick={this.props.deletePersonHandler.bind(this, this.props.id)} >
          I am {this.props.name} and I am {this.props.age} yeas old.
        </p>
        <input
          ref={this.inputElement} 
          type="text"
          value={this.state.inputValue}
          onChange={this.inputChangeHandler} />
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