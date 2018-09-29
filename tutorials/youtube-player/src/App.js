import React, { Component } from 'react';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';

const apiKey = 'AIzaSyC3Yx10Uq3DwCBwtwPLvOHVZREe6p1TADw';

class App extends Component {
    state = {
        videos: [],
        selectedVideo: null,
        loading: false
    }

    componentDidMount() {
        this.searchVideos('reactjs');
    }

    searchVideos = (term) => {
        YTSearch({key: apiKey, term}, (videos) => {
            this.setState({
                videos,
                selectedVideo: videos[0]
            });
        }); 
    }

    selectVideoHandler = (selectedVideo) => {
        this.setState({ selectedVideo });
    }

    render() {
        let videoSection = <div>Loading...</div>
        if (this.state.videos.length) {
            videoSection = (
                <React.Fragment>
                    <VideoDetail 
                        video={this.state.selectedVideo} />
                    <VideoList 
                        videoSelected={this.selectVideoHandler}
                        videos={this.state.videos} />
                </React.Fragment>
            );
        }

        return (
            <div>
                <SearchBar 
                    inputChanged={this.searchVideos} />
                {videoSection}
            </div>
        );
    }
}

export default App;