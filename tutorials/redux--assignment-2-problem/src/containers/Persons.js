import React, { Component } from 'react';
import { connect } from 'react-redux';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';
import * as actionTypes from '../components/store/actions';

class Persons extends Component {
    personAddedHandler = () => {
        const newPerson = {
            id: Math.random(), // not really unique but good enough here!
            name: 'Max',
            age: Math.floor( Math.random() * 40 )
        }
        
        this.props.addPerson(newPerson);
    }

    render () {
        return (
            <div>
                <AddPerson personAdded={this.personAddedHandler} />
                {this.props.persons.map(person => (
                    <Person 
                        key={person.id}
                        name={person.name} 
                        age={person.age} 
                        clicked={this.props.deletePerson.bind(this, person.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        persons: state.persons
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addPerson: (person) => dispatch({ type: actionTypes.ADD_PERSON, person }),
        deletePerson: (id) => dispatch({ type: actionTypes.DELETE_PERSON, id })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Persons);