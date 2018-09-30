import React from 'react';
import { shallow } from 'enzyme';

import App from '../App';
import CommentBox from '../CommentBox';
import CommentList from '../CommentList';

it('should show a comment a box', () => {
    const wrapped = shallow(<App />);

    expect(wrapped.find(CommentBox).length).toEqual(1);
});

it('should show a comment list', () => {
    const wrapped = shallow(<App />);

    expect(wrapped.find(CommentList).length).toEqual(1);
});