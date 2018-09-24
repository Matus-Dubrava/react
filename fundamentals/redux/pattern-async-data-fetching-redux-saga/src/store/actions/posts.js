import * as actionTypes from './actionTypes';

export const fetchPostsInit = () => {
    return {
        type: actionTypes.FETCH_POSTS_INIT
    };
};

export const fetchPostsSuccess = (posts) => {
    return {
        type: actionTypes.FETCH_POSTS_SUCCESS,
        posts
    };
};

export const fetchPostsFail = (error) => {
    return {
        type: actionTypes.FETCH_POSTS_FAIL,
        error
    };
};

export const fetchPosts = () => {
    // return (dispatch) => {
    //     dispatch(fetchPostsInit());

    //     axios.get('https://jsonplaceholder.typicode.com/todos')
    //         .then((res) => {
    //             dispatch(fetchPostsSuccess(res.data));
    //         })
    //         .catch((err) => {
    //             dispatch(fetchPostsFail(err));
    //         });
    // };
    return {
        type: actionTypes.FETCH_POSTS
    }
};