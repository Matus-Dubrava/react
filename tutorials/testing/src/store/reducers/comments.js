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

const fetchComments = (state, action) => {
    const comments = action.comments.map((comment) => {
        return comment.name;
    });

    return {
        ...state,
        comments: [...state.comments, ...comments]
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_COMMENT: return addComment(state, action);
        case actionTypes.FETCH_COMMENTS_SUCCESS: return fetchComments(state, action);
        default: return state;
    }
};

export default reducer;
