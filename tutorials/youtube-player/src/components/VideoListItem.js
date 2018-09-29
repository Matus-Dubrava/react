import React from 'react';

const videoListItem = (props) => {
    let video = null;
    if (props.video) {
        video =(
            <div className="video-list media">
                <div className="media-left">
                    <img
                        src={props.video.snippet.thumbnails.default.url} 
                        className="media-object" />
                </div>

                <div className="media-body">
                    <div className="media-heading">
                        {props.video.snippet.title}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <li className="list-group-item"
            onClick={props.clicked}>
            {video}
        </li>
    );
};

export default videoListItem;