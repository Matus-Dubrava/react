import React from 'react';
import { mount } from 'enzyme';

import Root from '../../Root';
import CommentBox from '../CommentBox';

let wrapped = null;
beforeEach(() => {
    wrapped = mount(
        <Root>
            <CommentBox />
        </Root>
    );
});

afterEach(() => {
    wrapped.unmount();
});

it('should have a textarea and a button', () => {
    expect(wrapped.find('button').length).toEqual(2);
    expect(wrapped.find('textarea').length).toEqual(1);
});

// SIMULATING EVENT
// 1. find the input event
// 2. simulate a 'change' event
// 3. provide a fake event object
// 4. force the component to update
// 5. assert that the input value has changed

describe('the textarea', () => {
    beforeEach(() => {
        wrapped.find('textarea').simulate('change', {
            target: { value: 'new comment' }
        });
    
        wrapped.update();
    });

    it('should have a textarea that users can type in', () => {
        expect(wrapped.find('textarea').prop('value')).toEqual('new comment');
    });
    
    it('should have a textarea that gets emptied once users submit the form', () => {
        expect(wrapped.find('textarea').prop('value')).toEqual('new comment');
    
        wrapped.find('form').simulate('submit');
        wrapped.update();
    
        expect(wrapped.find('textarea').prop('value')).toEqual('');
    });
});
