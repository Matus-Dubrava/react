import ReactDOM from 'react-dom';
import React from 'react';

import App from './components/App';
import Root from './Root';

const app = (
    <Root>
        <App />
    </Root>
);

ReactDOM.render(app, document.getElementById('root'));