import React, { Component } from 'react';
import { connect } from 'react-redux';

import './SearchBar.css';
import * as actions from '../../store/actions';

class SearchBar extends Component {
    state = {
        searchTerm: ''
    }

    inputChangedHandler = (event) => {
        this.setState({
            searchTerm: event.target.value
        });
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onWeatherDataFetch(this.state.searchTerm);
    }

    render() {
        return (
            <form
                onSubmit={this.formSubmitHandler} 
                className="search-bar">
                <input 
                    placeholder="Enter a city name"
                    type="text"
                    onChange={this.inputChangedHandler}
                    className="search-bar__input"
                    value={this.state.searchTerm} />

                <button
                    className="search-bar__btn">Get forecast</button>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onWeatherDataFetch: (cityName) => dispatch(actions.weatherDataFetch(cityName))
    };
};

export default connect(null, mapDispatchToProps)(SearchBar);