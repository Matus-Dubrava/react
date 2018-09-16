import React from 'react';

import classes from './Input.css';

const input = (props) => {
  let input = null;
  const assignedClasses = [classes.Input];

  if (!props.valid && props.touched) {
    assignedClasses.push(classes.Danger);
  }

  switch (props.inputType) {
    case 'input': 
      input = ( 
        <input
          onChange={props.inputChanged}
          value={props.value} 
          className={assignedClasses.join(' ')} 
          {...props.config} />
      );
      break;
    case 'select':
      const options = props.config.options.map((opt) => {
        return ( 
          <option 
            key={opt.optName}
            name={opt.optName}>{opt.optText}</option>
        );
      });

      input = (
        <select
          onChange={props.inputChanged}
          value={props.value} 
          className={assignedClasses.join(' ')} 
          {...props.config} >
          {options}
        </select>
        );
      break;
    default: 
      input = (
        <input
          onChange={props.inputChanged}
          value={props.value} 
          className={assignedClasses.join(' ')} 
          {...props.config} />
      );
      break;
  }

  const labelClasses = [classes.Label];
  let label = null;

  if (props.inputType !== 'select') {
    labelClasses.push(classes.AnimateLabel);
  }

  if (props.inputType !== 'input' || props.value !== '') {
    label = (
      <label 
        className={labelClasses.join(' ')}>
        {props.label}</label>
    );
  }

  const errors = [];
  for (let err in props.messages) {
    errors.push(props.messages[err]);
  }

  const errorElements = errors.map((err) => {
    return <li className={classes.Error} key={err}>{err}</li>
  });

  return (
    <div className={classes.InputGroup}>
      {label}
      {input}
      {errorElements}
    </div>
  );
};

export default input;