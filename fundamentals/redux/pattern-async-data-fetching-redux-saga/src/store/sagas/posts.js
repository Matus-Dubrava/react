import axios from 'axios';
import { put } from 'redux-saga/effects';

import * as actions from '../actions/index';

export function* fetchPostsSaga(action) {
    yield put(actions.fetchPostsInit());

    try {
        const res = yield axios.get('https://jsonplaceholder.typicode.com/todos');
        yield put(actions.fetchPostsSuccess(res.data));
    } catch (err) {
        yield put(actions.fetchPostsFail(err));
    }   
};