import * as actionTypes from './actions';

const initialState = {
    persons: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PERSON:
            const newPerson = {
                id: Math.random(), // not really unique but good enough here!
                name: action.name,
                age: action.age
            };

            return {
                persons: [...state.persons, newPerson]
            };
        case actionTypes.DELETE_PERSON:
            return {
                persons: state.persons.filter((pers) => pers.id !== action.id)
            };
        default: 
            return state;
    }
};

export default reducer;