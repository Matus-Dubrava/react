import React from 'react';

const videoDetail = ({ video }) => {
    let videoDetail = null;
    if (video) {
        videoDetail = (
            <React.Fragment>
                <div className="embed-responsive embed-responsive-16by9">
                    <iframe 
                        src={'https://youtube.com/embed/' + video.id.videoId}
                        className="embed-responsive-item"></iframe>
                </div>
                <div className="video-detail__details">
                    <div className="video-detail__title">{video.snippet.title}</div>
                    <div>{video.snippet.description}</div>
                </div>
            </React.Fragment>
        );
    }

    return (
        <div className="video-detail col-md-8">
            {videoDetail}
        </div>
    );
};

export default videoDetail;