import * as actionTypes from '../actions/actionTypes';

const initialState = {
    posts: [],
    loading: false,
    error: null
};

const fetchPostsInit = (state, action) => {
    return {
        ...state,
        loading: true,
        error: null
    };
};

const fetchPostsSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: false,
        posts: action.posts
    };
};

const fetchPostsFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_POSTS_INIT: return fetchPostsInit(state, action);
        case actionTypes.FETCH_POSTS_SUCCESS: return fetchPostsSuccess(state, action);
        case actionTypes.FETCH_POSTS_FAIL: return fetchPostsFail(state, action);
        default: return state;
    }
};

export default reducer;