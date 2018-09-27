import React, { Component } from 'react';

class SearchBar extends Component {
    state = {
        term: ''
    }
    
    inputChangedHandler = (event) => {
        this.setState({ term: event.target.value });
    }

    render() {
        return (
            <div>
                <input
                    onChange={this.inputChangedHandler}
                    type="text"
                    value={this.state.term} />
            </div>
        );
    }
}

export default SearchBar;