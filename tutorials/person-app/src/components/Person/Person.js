import React, { Component } from 'react';
import Radium from 'radium';
import './Person.css';

class Person extends Component {
	state = {
		inputValue: this.props.name
	};

	inputChangeHandler = (event) => {
		this.setState({ inputValue: event.target.value });
		this.props.nameChangedHandler(event.target.value, this.props.id);
	};

	render() {
		return (
			<div className="Person">
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
			</div>
		);
	}
}

export default Radium(Person);