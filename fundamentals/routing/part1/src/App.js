import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';
import Header from './Header/Header';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Header />

                    <Route 
                        path='/'
                        exact
                        render={() => <h1>This is Home section</h1>} />
                    <Route 
                        path='/products'
                        exact
                        render={() => <h1>This is Products section</h1>} />
                    <Route 
                        path='/pricing'
                        exact
                        render={() => <h1>This is Pricing section</h1>} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
