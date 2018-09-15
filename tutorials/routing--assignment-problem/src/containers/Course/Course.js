import React, { Component } from 'react';

class Course extends Component {
    render () {
        let id = 0;
        let title = '';

        if (this.props.match) {
            id = +this.props.match.params.id;
            title = decodeURIComponent(this.props.location.search.split('=')[1]);
        }
        
        return (
            <div className="Course">
                <h1>{title}</h1>
                <p>You selected the Course with ID: {id}</p>
            </div>
        );
    }
}

export default Course;