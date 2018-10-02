import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './components/App';
import Root from './Root';

const app = (
    <Root>
        <BrowserRouter>
            <Route path="/" component={App} />
        </BrowserRouter>
    </Root>
);

ReactDOM.render(app, document.getElementById('root'));