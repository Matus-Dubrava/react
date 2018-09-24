import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';

import * as actions from '../actions/index';

// return (dispatch) => {
  //   axios.get('https://burger-builder-32ae6.firebaseio.com/ingredients.json')
  //     .then((res) => {
  //       dispatch(_fetchIngredients(false, res.data));
  //     })
  //     .catch((err) => {
  //       dispatch(_fetchIngredients(true));
  //     });
  // };

export function* fetchIngredientsSaga() {
    try {
        const res = yield axios.get('https://burger-builder-32ae6.firebaseio.com/ingredients.json');
        yield put(actions._fetchIngredients(false, res.data));
    } catch (err) {
        yield put(actions._fetchIngredients(true));
    }
};