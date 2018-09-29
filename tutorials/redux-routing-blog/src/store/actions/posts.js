import * as actionTypes from './actionTypes';
import axios from 'axios';

const KEY = 'some-random-string-12391402';

export const postsFetchInit = () => {
    return {
        type: actionTypes.POSTS_FETCH_INIT
    };
};

export const postsFetchSuccess = (posts) => {
    return {
        type: actionTypes.POSTS_FETCH_SUCCESS,
        posts
    };
};

export const postsFetchFail = (error) => {
    return {
        type: actionTypes.POSTS_FETCH_FAIL,
        error
    };
};

export const postFetchSuccess = (post) => {
    return {
        type: actionTypes.POST_FETCH_SUCCESS,
        post
    };
};

export const postDeleteSuccess = (post) => {
    return {
        type: actionTypes.POST_DELETE,
        post
    };
};

export const postDelete = (id) => {
    return (dispatch) => {
        dispatch(postsFetchInit);

        axios.delete('http://reduxblog.herokuapp.com/api/posts/' + id + '?key=' + KEY)
            .then((res) => {
                dispatch(postDeleteSuccess(res.data));
            })
            .catch((err) => {
                dispatch(postsFetchFail(err));
            });
    }  
}

export const postFetch = (id) => {
    return (dispatch) => {
        dispatch(postsFetchInit());

        axios.get('http://reduxblog.herokuapp.com/api/posts/' + id + '?key=' + KEY)
            .then((res) => {
                dispatch(postFetchSuccess(res.data));
            })
            .catch((err) => {
                dispatch(postsFetchFail(err));
            });
    }
};

export const postsFetch = () => {
    return (dispatch) => {
        dispatch(postsFetchInit());

        axios.get('http://reduxblog.herokuapp.com/api/posts?' + KEY)
            .then((res) => {
                dispatch(postsFetchSuccess(res.data));
            })
            .catch((err) => {
                dispatch(postsFetchFail(err));
            });
    };
};