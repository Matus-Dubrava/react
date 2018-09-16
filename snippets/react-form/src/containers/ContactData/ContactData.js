import React, { Component } from 'react';

import classes from './ContactData.css';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';

class ContactData extends Component {
  state = {
    formFields: {
      username: {
        label: 'Username',
        inputType: 'input',
        config: {
          type: 'text',
          name: 'username',
          placeholder: 'Your Name'
        },
        value: '',
        valid: false,
        validation: {
          required: true
        },
        validationMessage: {},
        touched: false
      },
      email: {
        label: 'E-Mail',
        inputType: 'input',
        config: {
          type: 'text',
          name: 'email',
          placeholder: 'Your E-Mail'
        },
        value: '',
        valid: false,
        validation: {
          required: true,
          email: true
        },
        validationMessage: {},
        touched: false
      },
      password: {
        label: 'Password',
        inputType: 'input',
        config: {
          type: 'password',
          name: 'password',
          placeholder: 'Your password'
        },
        value: '',
        valid: false,
        validation: {
          required: true,
          minLength: 8,
          password: true
        },
        validationMessage: {},
        touched: false
      },
      password2: {
        label: 'Repeat Password',
        inputType: 'input',
        config: {
          type: 'password',
          name: 'password',
          placeholder: 'Repeat your password'
        },
        value: '',
        valid: false,
        validation: {
          required: true,
          match: 'password'
        },
        validationMessage: {},
        touched: false
      },
      zip: {
        label: 'ZIP Code',
        inputType: 'input',
        config: {
          type: 'text',
          name: 'zip',
          placeholder: 'ZIP code'
        },
        value: '',
        valid: false,
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        validationMessage: {},
        touched: false
      },
      gender: {
        label: 'Gender',
        inputType: 'select',
        config: {
          name: 'gender',
          options: [
            { optName: 'female', optText: 'Female' },
            { optName: 'male', optText: 'Male' },          
          ]
        },
        value: 'female',
        valid: true,
        validation: {},
        validationMessage: {},
        touched: false
      }
    },
    loading: false,
    valid: false
  }

  checkFieldValidity = (value, rules) => {
    let isValid = true;
    let messages = {};

    if (rules.required) {
      isValid = isValid && value.length !== 0;
      if (value.length === 0) {
        messages.required = 'This field is required.';
      } else {
        delete messages.required;
      }
    }

    if (rules.minLength) {
      isValid = isValid && value.length >= rules.minLength;
      if (value.length < rules.minLength) {
        messages.minLength = 'Min. length is ' + rules.minLength;
      } else {
        delete messages.minLength;
      }
    }

    if (rules.maxLength) {
      isValid = isValid && value.length <= rules.maxLength;
      if (value.length > rules.maxLength) {
        messages.maxLength = 'Max. length is ' + rules.maxLength;
      } else {
        delete messages.maxLength;
      }
    }

    if (rules.email) {
      if (value.indexOf('@') === -1 || value.indexOf('.') === -1) {
        isValid = false;
        messages.email = 'Must be a valid E-Mail address';
      } else {
        delete messages.email;
      }
    }

    if (rules.match) {
      if (value !== this.state.formFields[rules.match].value) {
        isValid = false;
        messages.match = 'Value must match with ' + rules.match + ' field';
      } else {
        delete messages.match;
      }
    }

    if (rules.password) {
      const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowerCaseLetters = upperCaseLetters.toLowerCase();
      const digits = '0123456789';
      
      let hasUpperCase = false;
      let hasLowerCase = false;
      let hasDigit = false;

      [...value].forEach((char) => {
        if (upperCaseLetters.indexOf(char) > -1) {
          hasUpperCase = true;
        }

        if (lowerCaseLetters.indexOf(char) > -1) {
          hasLowerCase = true;
        }

        if (digits.indexOf(char) > -1) {
          hasDigit = true;
        }
      });

      if (!hasUpperCase) {
        isValid = false;
        messages.oneUpperCaseCharacter = 'Must contain at least one uppercase letter';
      } else {
        delete messages.oneUpperCaseCharacter;
      }

      if (!hasLowerCase) {
        isValid = false;
        messages.oneLowerCaseCharacter = 'Must contain at least one lowercase letter';
      } else {
        delete messages.oneLowerCaseCharacter;
      }

      if (!hasDigit) {
        isValid = false;
        messages.oneDigit = 'Must contain at least one digit';
      } else {
        delete messages.oneDigit;
      }
    }

    return { isValid, messages };
  }

  checkFormValidityAndSubmit = () => {
    const fieldNames = Object.keys(this.state.formFields);
    const updatedFields = {...this.state.formFields};
    let allFieldsValid = true;
    
    fieldNames.forEach((fld) => {
      const {isValid, messages } =  this.checkFieldValidity(updatedFields[fld].value, updatedFields[fld].validation);
      updatedFields[fld].touched = true;
      updatedFields[fld].valid = isValid;
      updatedFields[fld].validationMessage = messages;
      allFieldsValid = allFieldsValid && isValid;
    });

    this.setState({ 
      formFields: updatedFields, 
      valid: allFieldsValid
    });

    if (allFieldsValid) {
      this.setState({ loading: true });
      console.log('submitted...');
    }
  }

  inputChangeHandler = (event, fld) => {
    const updatedFields = {...this.state.formFields};
    const updatedField = {...this.state.formFields[fld]};
    const { isValid, messages } = this.checkFieldValidity(
      event.target.value, this.state.formFields[fld].validation);

    updatedField.value = event.target.value;
    updatedFields[fld] = updatedField;
    updatedFields[fld].valid = isValid;
    updatedFields[fld].touched = true;
    updatedFields[fld].validationMessage = messages;

    this.setState({ formFields: updatedFields });
  }

  submitFormHandler = (event) => {
    event.preventDefault();
    // this.setState({ loading: true });

    this.checkFormValidityAndSubmit();
  };

  render() {
    const fields = Object.keys(this.state.formFields);
    const form = fields.map((fld) => {
      return (
        <Input
          messages={this.state.formFields[fld].validationMessage}
          label={this.state.formFields[fld].label}
          touched={this.state.formFields[fld].touched}
          valid={this.state.formFields[fld].valid}
          value={this.state.formFields[fld].value}
          inputChanged={(event) => this.inputChangeHandler(event, fld)}
          key={fld}
          config={this.state.formFields[fld].config}
          inputType={this.state.formFields[fld].inputType} />
      );
    });

    let formElement = (
      <form 
        onSubmit={this.submitFormHandler}
        className={classes.ContactData}>
        {form}
        <button className={classes.Btn} type="submit">Submit</button>
      </form>
    )

    if (this.state.loading) {
      formElement = <Spinner style={{ marginTop: '6rem' }} />
    }

    return (
      <React.Fragment>
        {formElement}
      </React.Fragment>
    );
  }
}

export default ContactData;