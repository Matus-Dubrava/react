import * as actions from '../';
import * as actionTypes from '../actionTypes';

const addComment = actions.addComment;

describe('addComment', () => {
    const comment = 'new comment';
    const action = addComment(comment);

    it('should have a correct type', () => {
        expect(action.type).toEqual(actionTypes.ADD_COMMENT);
    });

    it('should have a correct payload', () => {
        expect(action.comment).toEqual('new comment');
    });
});