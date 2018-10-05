import React from 'react';
import { Route } from 'react-router-dom';

import Header from './Header';
import Welcome from './Welcome';
import Signup from './auth/Signup';

const app = (props) => {
    return (
        <div>
            <Header />
            <Route path="/" component={Welcome} exact />
            <Route path="/signup" component={Signup} />
        </div>
    );
};

export default app;