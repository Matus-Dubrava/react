import * as actionTypes from './actions';

const initialState = {
    persons: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_PERSON:
            return {
                persons: [...state.persons, action.person]
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