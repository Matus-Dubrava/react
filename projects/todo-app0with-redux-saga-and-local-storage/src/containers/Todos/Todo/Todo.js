import React from 'react';

import classes from './Todo.css';

const todo = (props) => {
    const date = String(new Date(props.date))
        .split('GMT')[0]
        .trim();

    let completeButton = (
        <button
            style={{
                backgroundColor: '#84DCCF'
            }}
            onClick={props.todoCompleted}>complete</button>
    );

    const style = {};
    if (props.completed) {
        style.backgroundColor = '#caf7f1'
        completeButton = null;
    };


    return (
        <div 
            className={classes.Todo}
            style={style} >
            <p style={{
                marginBottom: '1.5rem',
                fontSize: '1.3rem',
                color: '#666'
            }}>{date}</p>
            <p>{props.value}</p>
            <button
                style={{
                    backgroundColor: '#EF626C'
                }}
                onClick={props.todoRemoved}>remove</button>
            {completeButton}
        </div>
    );
};

export default todo;