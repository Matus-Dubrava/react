import React, { Component } from 'react';

import classes from './Person.css';
import WithClass from '../../hoc/WithClass';

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
      <WithClass classes={classes.Person}>
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
      </WithClass>
    );
	} 
}

export default Person;