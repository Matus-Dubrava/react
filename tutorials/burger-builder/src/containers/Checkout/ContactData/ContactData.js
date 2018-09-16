import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false,
    totalPrice: 0
  }

  orderHandler = (event) => {
    event.preventDefault();

    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'Matus Dubrava',
        address: {
          street: 'Teststreet 12',
          zipCode: '12394',
          country: 'Slovakia'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };

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

  render() {
    let form = (
      <form>
        <Input inputtype="input" type="text" name="name" placeholder="Your name" />
        <Input inputtype="input" type="email" name="email" placeholder="Your email" />
        <Input inputtype="input" type="text" name="street" placeholder="Your street" />
        <Input inputtype="input" type="text" name="postalCode" placeholder="Your postalCode" />
        <Button 
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