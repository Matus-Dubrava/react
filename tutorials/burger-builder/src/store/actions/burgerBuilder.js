import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingredientName) => {
  return {
    type: actionTypes.ADD_INGREDIENT, 
    ingredientName
  };
};

export const removeIngredient = (ingredientName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT, 
    ingredientName
  };
};

const _fetchIngredients = (error, ingredients) => {
  return {
    type: actionTypes.FETCH_INGREDIENTS,
    error,
    ingredients
  }
};

export const fetchIngredients = () => {
  return (dispatch) => {
    axios.get('https://burger-builder-32ae6.firebaseio.com/ingredients.json')
      .then((res) => {
        dispatch(_fetchIngredients(false, res.data));
      })
      .catch((err) => {
        dispatch(_fetchIngredients(true));
      });
  };
};