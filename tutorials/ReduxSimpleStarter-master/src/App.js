import React, { Component } from 'react';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';

const apiKey = 'AIzaSyC3Yx10Uq3DwCBwtwPLvOHVZREe6p1TADw';

class App extends Component {
    state = {
        videos: []
    }

    componentDidMount() {
        YTSearch({key: apiKey, term: 'reactjs'}, (videos) => {
            this.setState({videos});
        }); 
    }

    render() {
        console.log(this.state.videos);
        return (
            <div>
                <SearchBar />
                <VideoList />
            </div>
        );
    }
}

export default App;