import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP CODE'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'email',
        elementConfig: {
          type: 'text',
          placeholder: 'Your E-Mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'},          
          ]
        },
        value: 'fastest',
        valid: true,
        validation: {}
      },
    },
    loading: false,
    totalPrice: 0,
    formIsValid: false
  }

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = isValid && value.trim() !== '';
    }

    if (rules.minLength) {
      isValid = isValid && value.length >= rules.minLength;
    }

    if (rules.maxLength) {
      isValid = isValid && value.length <= rules.maxLength;
    }



    return isValid;
  }

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });
    const formData = {};
    for (let formElementIdent in this.state.orderForm) {
      formData[formElementIdent] = this.state.orderForm[formElementIdent].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData
    }

    axios.post('/orders.json', order)
      .then((res) => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch((err) => {
        this.setState({ loading: false });
        console.log(err);
      });
  };

  inputChangedHandler(event, inputId) {
    const updatedOrderForm = {
      ...this.state.orderForm
    };

    const updatedFormElement = {
      ...updatedOrderForm[inputId]
    };

    updatedFormElement.touched = true;
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedOrderForm[inputId] = updatedFormElement;
    
    let formIsValid = true;
    for (let inputIdent in updatedOrderForm) {
      formIsValid = formIsValid && updatedOrderForm[inputIdent].valid;
    }

    this.setState({ 
      orderForm: updatedOrderForm,
      formIsValid
    });
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    const inputs = formElementsArray.map((formElement) => {
      return <Input 
        touched={formElement.config.touched}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig} 
        value={formElement.config.value} />
    });

    let form = (
      <form onSubmit={this.orderHandler}>
        {inputs}
        <Button 
          disabled={!this.state.formIsValid}
          btnType="Success" 
          clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    
    if (this.state.loading) {
      form = <Spinner />
    }
    
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;