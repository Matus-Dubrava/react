import commentsReducer from '../comments';
import * as actionTypes from '../../actions/actionTypes';

let initialState = null;
beforeEach(() => {
    initialState = { comments: [] };
});

it('should handle actions of type "ADD_COMMENT"', () => {
    const action = {
        type: actionTypes.ADD_COMMENT,
        comment: 'new comment'
    };

    const newState = commentsReducer(initialState, action);

    expect(newState.comments).toEqual(['new comment']);
});

it('should handle actions with unknown type without throwing an error', () => {
    const action = {
        type: 'SOME_RANDOM_ACTION_TYPE_123144912102',
        payload: 'dmidaosd'
    };

    const newState = commentsReducer(initialState, action);

    expect(newState.comments).toEqual([]);
});
