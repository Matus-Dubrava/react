import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Signup from './auth/Signup';
import Signin from './auth/Signin';

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Header />

                        <Route
                            path="/"
                            render={() => <h4>Home Page</h4>}
                            exact
                        />
                        <Route path="/signup" component={Signup} />
                        <Route path="/signin" component={Signin} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
