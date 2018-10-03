import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import CommentBox from '../CommentBox/CommentBox';
import CommentList from '../CommentList/CommentList';
import Navigation from '../Navigation/Navigation';

class App extends Component {
    render() {
        return (
            <div className="container">
                <Navigation />
                
                <Switch>
                    <Route path="/post" component={CommentBox} />
                    <Route path="/" component={CommentList} /> 
                </Switch>
            </div>
        );
    }
}

export default App;