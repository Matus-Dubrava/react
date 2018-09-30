import React, { Component } from 'react';

import CommentBox from './CommentBox';
import CommentList from './CommentList';

const app = () => {
    return (
        <div>
            <CommentBox />
            <CommentList />
        </div>
    );
};

export default app;