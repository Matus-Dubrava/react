import React from 'react';
import { shallow } from 'enzyme';

import InputBox from './InputBox';

let wrapped = null;

beforeEach(() => {
    wrapped = shallow(<InputBox />);
});

it('should have a form', () => {
    expect(wrapped.find('form').length).toEqual(1);
});

it('should have an input field', () => {
    expect(wrapped.find('input').length).toEqual(1);
});

it('should have a button', () => {
    expect(wrapped.find('button').length).toEqual(1);
});

it('should have an input that users can type in', () => {
    wrapped.find('input').simulate('change', {
        target: { value: 'some input' }
    });

    wrapped.update();

    expect(wrapped.find('input').prop('value')).toEqual('some input');
});

it('should have an input that gets emptied once the form is submitted', () => {
    wrapped.find('input').simulate('change', {
        target: { value: 'some input' }
    });
    wrapped.update();
    expect(wrapped.find('input').prop('value')).toEqual('some input');

    wrapped.find('form').simulate('submit', { preventDefault() {} });
    wrapped.update();
    expect(wrapped.find('input').prop('value')).toEqual('');
});