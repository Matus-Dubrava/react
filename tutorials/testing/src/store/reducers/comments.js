import * as actionTypes from '../actions/actionTypes';

const initialState = {
    comments: []
};

const addComment = (state, action) => {
    return {
        ...state,
        comments: [...state.comments, action.comment]
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_COMMENT: return addComment(state, action);
        default: return state;
    }
};

export default reducer;
