import React from 'react';
import { Route } from 'react-router-dom';

import Header from './Header';
import Welcome from './Welcome';

const app = (props) => {
    return (
        <div>
            <Header />
            <Route path="/" component={Welcome} />
        </div>
    );
};

export default app;