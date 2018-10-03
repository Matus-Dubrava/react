import tv4 from 'tv4';
import stateSchema from './stateSchema';

export default (store) => (next) => (action) => {
    next(action);

    console.log(tv4.validate(store.getState(), stateSchema));
}