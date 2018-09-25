import React, { Component } from 'react';

import classes from './App.css';
import Input from './components/Input/Input';
import Todos from './containers/Todos/Todos';

class App extends Component {
    render() {
        return (
            <div className={classes.App}>
                <div className={classes.Logo}>TODO APP</div>
                <Input />
                <Todos />
            </div>
        );
    }
}

export default App;
