import * as actionTypes from '../actions/actionTypes';

const initialState = {
    posts: [],
    loading: false,
    error: null,
    currentPost: null
};

const postsFetchInit = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null,
        currentPost: null
    };
};

const postsFetchSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        posts: action.posts
    };
};

const postsFetchFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    };
};

const postDeleteSuccess = (state, action) => {
    const posts = state.posts.filter((post) => {
        return post.id !== action.post.id;
    });

    return {
        ...state,
        loading: false,
        posts
    };
};

const postFetchSuccess = (state, action) => {
    return {
        ...state,
        currentPost: action.post
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POSTS_FETCH_INIT: return postsFetchInit(state, action);
        case actionTypes.POSTS_FETCH_SUCCESS: return postsFetchSuccess(state, action);
        case actionTypes.POSTS_FETCH_FAIL: return postsFetchFail(state, action);
        case actionTypes.POST_FETCH_SUCCESS: return postFetchSuccess(state, action);
        case actionTypes.POST_DELETE: return postDeleteSuccess(state, action);
        default: return state;
    }
};

export default reducer;