import React, { Component } from 'react';

import './AddPerson.css';

class AddPerson extends Component {
    state = {
        nameInpValue: '',
        ageInpValue: 0
    }

    nameChangeHandler = (event) => {
        this.setState({ nameInpValue: event.target.value });
    }

    ageChangeHandler = (event) => {
        this.setState({ ageInpValue: +event.target.value });
    }

    render() {
        return (
            <div className="AddPerson">
                <input
                    value={this.state.nameInpValue}
                    onChange={this.nameChangeHandler} 
                    type="text" 
                    placeholder="Name" />
                <input 
                    value={this.state.ageInpValue}
                    onChange={this.ageChangeHandler}
                    type="number" 
                    placeholder="Age" />
                <button onClick={
                    this.props.personAdded.bind(
                        this, 
                        this.state.nameInpValue, 
                        this.state.ageInpValue)
                    }>Add Person</button>
            </div>
        );
    }
};

export default AddPerson;