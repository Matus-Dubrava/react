import React, { Component } from 'react';
import './Person.css';

class Person extends Component {
	state = {
		inputValue: this.props.name
	};

	inputChangeHandler = (event) => {
		this.setState({ inputValue: event.target.value });
	};

	render() {
		return (
			<div className="Person">
				<p 
					onClick={this.props.click} >
					I am {this.props.name} and I am {this.props.age} yeas old.
				</p>
				<input 
					type="text"
					value={this.state.inputValue}
					onChange={(event) => {
						this.inputChangeHandler(event);
						this.props.changed(event);
					}} />
			</div>
		);
	}
}

export default Person;