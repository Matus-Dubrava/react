import React from 'react';

import VideoListItem from './VideoListItem';

const videoList = (props) => {
    const videos = props.videos.map((video) => {
        return (
            <VideoListItem 
                clicked={() => props.videoSelected(video)}
                video={video}
                key={video.etag} />
        );
    });

    return (
        <ul className="col-md-4 list-group">
            {videos}
        </ul>
    );
};

export default videoList;