import React from 'react';

const videoListItem = (props) => {
    return (
        <li className="list-group-item">
            <div className="video-list media">
                <div className="media-left">
                    <img
                        src={props.video.snippet.thumbnails.medium.url} 
                        className="media-object" />
                </div>

                <div className="media-body">
                    <div className="media-heading">
                        {props.video.snippet.title}
                    </div>
                </div>
            </div>
        </li>
    );
};

export default videoListItem;