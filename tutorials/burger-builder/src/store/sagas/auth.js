import { delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';

export function* logoutSaga(action) {
    yield call([localStorage, 'removeItem'], 'token');
    // yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationTime * 1000);
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart());
    
    const authData = {
        email: action.email, 
        password: action.password,
        returnSecureToken: true
    };

    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAx0feICyI7dQNjQCkTCCltokF6li6XVKE';
    if (!action.isSignup) {
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAx0feICyI7dQNjQCkTCCltokF6li6XVKE';
    }

    try {
        const res = yield axios.post(url, authData);
    
        const expirationDate = yield new Date(new Date().getTime() + res.data.expiresIn * 1000);
        yield localStorage.setItem('token', res.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', res.data.localId);
        yield put(actions.authSuccess(res.data));
        yield put(actions.checkAuthTimeout(res.data.expiresIn));
    } catch (err) {
        yield put(actions.authFail(err.response.data.error));
    } 
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
        const localId = yield localStorage.getItem('userId');
        
        if (expirationDate > new Date()) {
            const authData = {
                idToken: token,
                localId
            };

            yield put(actions.authSuccess(authData));
            yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
        } else {
            yield put(actions.logout(token));
        }
    }
};