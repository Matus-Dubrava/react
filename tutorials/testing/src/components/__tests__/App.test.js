import React from 'react';
import { shallow } from 'enzyme';

import App from '../App';
import CommentBox from '../CommentBox';
import CommentList from '../CommentList';

let wrapped = null;
beforeEach(() => {
    wrapped = shallow(<App />);
});

it('should show a comment a box', () => {
    expect(wrapped.find(CommentBox).length).toEqual(1);
});

it('should show a comment list', () => {
    expect(wrapped.find(CommentList).length).toEqual(1);
});