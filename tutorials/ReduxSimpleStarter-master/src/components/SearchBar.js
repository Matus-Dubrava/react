import React, { Component } from 'react';

class SearchBar extends Component {
    state = {
        term: ''
    }
    
    inputChangedHandler = (event) => {
        this.setState({ term: event.target.value });
        this.props.inputChanged(event.target.value);
    }

    render() {
        return (
            <div className="search-bar">
                <input
                    onChange={this.inputChangedHandler}
                    type="text"
                    value={this.state.term} />
            </div>
        );
    }
}

export default SearchBar;