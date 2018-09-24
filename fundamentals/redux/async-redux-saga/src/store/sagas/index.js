import { takeEvery } from 'redux-saga/effects'; 

import { fetchPostsSaga } from './posts';
import * as actionTypes from '../actions/actionTypes';

export function* watchPosts() {
    yield takeEvery(actionTypes.FETCH_POSTS, fetchPostsSaga);
};

export default watchPosts;