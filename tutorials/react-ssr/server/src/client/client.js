import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';

const app = (
    <BrowserRouter>
        <Routes />
    </BrowserRouter>
);

ReactDOM.hydrate(app, document.getElementById('root'));
