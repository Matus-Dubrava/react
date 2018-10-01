import React from 'react';
import { mount } from 'enzyme';

import CommentList from '../CommentList';
import Root from '../../Root';

let wrapped = null;

beforeEach(() => {
    const initialState = {
        comments: {
            comments: ['Comment 1', 'Comment 2']
        }
    };

    wrapped = mount(
        <Root initialState={initialState}>
            <CommentList />
        </Root>
    );
});

afterEach(() => {
    wrapped.unmount();
});

it('should create one LI per comment', () => {
    expect(wrapped.find('li').length).toEqual(2);
});

it('should show the text for each comment', () => {
    expect(wrapped.render().text()).toContain('Comment 1');
    expect(wrapped.render().text()).toContain('Comment 2');
});