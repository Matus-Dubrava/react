import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Signup from './auth/Signup';

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
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
