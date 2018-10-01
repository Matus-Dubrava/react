import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';

import Root from '../Root';
import App from '../components/App';

beforeEach(() => {
    moxios.install();
});

afterEach(() => {
    moxios.uninstall();
});

it('should be able to fetch a list of comments and display then', (done) => {
    const wrapped = mount(
        <Root>
            <App />
        </Root>
    );

    wrapped.find('.fetch-comments').simulate('click');
    wrapped.update();
    
    moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
            status: 200,
            response: [
                { name: 'fetched 1' },
                { name: 'fetched 2' }
            ]
        }).then(() => {
            wrapped.update();
            expect(wrapped.find('li').length).toEqual(2);
            done();
        })

    })
});