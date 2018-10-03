import * as actionTypes from '../actions/actionTypes';

const initialState = {
    comments: []
};

const fetchComments = (state, action) => {
    const fetchedComments = action.payload.map((comment) => {
        return comment.name
    });

    return {
        ...state,
        comments: [...state.comments, ...fetchedComments]
    };
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_COMMENTS: return fetchComments(state, action);
        default: return state;
    }
};

export default reducer;