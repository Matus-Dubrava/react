import React from 'react';
import { Route } from 'react-router-dom';

import Header from './Header';
import Welcome from './Welcome';
import Signup from './auth/Signup';
import Feature from './Feature';
import Signout from './auth/Signout';
import Signin from './auth/Signin';

const app = (props) => {
    return (
        <div>
            <Header />
            <Route path="/" component={Welcome} exact />
            <Route path="/signup" component={Signup} />
            <Route path="/feature" component={Feature} />
            <Route path="/signout" component={Signout} />
            <Route path="/signin" component={Signin} />
        </div>
    );
};

export default app;