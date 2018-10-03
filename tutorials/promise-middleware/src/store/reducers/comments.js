import * as actionTypes from '../actions/actionTypes';

const initialState = {
    comments: []
};

const addComments = (state, action) => {
    return {
        ...state,
        comments: [...state.comments, action.payload]
    };
};

const fetchComment = (state, action) => {
    const comments = action.payload.data.map((comment) => {
        return { name: comment.name, id: comment.id };
    });

    return {
        ...state,
        comments: [...state.comments, ...comments]
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_COMMENT: return addComments(state, action);
        case actionTypes.FETCH_COMMENTS: return fetchComment(state, action);
        default: return state;
    }
};

export default reducer;