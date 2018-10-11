This guide shows how we can handle basic credit payments with Stripe, React (and Node, Express, Mongoose). We assume that we have access to the node server with implemented authentication process using cookies and access to the authenticated user via __req.user__ inside of our middleware functions and routes (although it can be easily tweeked to work with any authentication scheme).

Let's look on a diagram that shows the flow of actions that we need to handle when we want to implement simple Stripe payments. And by simple I mean one-time payments that we are going to exchange for credits that can be used to buy something on our page, whether some product or service.

![react stripe flow diagram](https://github.com/Matus-Dubrava/react/blob/master/fundamentals/react/react-stripe-credit-payments/react-stripe-flow.png)

* [1 client and server setup](#1-client-and-server-setup)
* [2 create stripe payment component](#2-create-stripe-payment-component)
* [3 4 user interacts with stripe component](#3-4-user-interacts-with-stripe-component)
* [5 6 7 form is submited to the stripe service](#5-6-7-form-is-submited-to-the-stripe-service)

# 1 client and server setup

Here I would only like to mention some modules that we are going to need to make use of Stripe payments (modules related to stripe).

On the client side, we are goint to use `react-stripe-checkout` module.

`npm install --save react-stripe-checkout` (in the client _package.json_ file)

On the server side, we need to install `stripe` module.

`npm install --save stripe` (in the server _package.json_ file)

# 2 create stripe payment component

First, we need to import the stripe component from the module that we have installed on the client.

```javascript
import StripeCheckout from 'react-stripe-checkout';
```

Next, thing to do is to is to place the imported component inside of some other component where we want to show it, note that the `StripeComponent` is a button. We also need to provide some properties to this component:

* __name__ - text that will be used as a form header once a user clicks the button
* __description__ - similar to name property, it will be shown as a text in the form that should give a user better idea for what he/she is paying for
* __amount__ - the amount of money that we are going to bill the user (by default in US cents, 100 = 1 dolar)
* __stripeKey__ - public key provided by stripe API
* __token__ - function that will be executed once the form is submitted, this function automatically receives __token__ object

There are several other properties that we can specify but this is like the minimum reasonable subset of them.

```javascript
<StripeCheckout
    name="MaApp"
    description="get 1 credit for 1$"
    amount={100}
    stripeKey={process.env.REACT_APP_STRIPE_KEY}
    token={token => this.props.onHandleToken(token)}
>
    <button className="btn">Add Credits</button>
</StripeCheckout>
```

One thing to note here is that we are not directly passing the __stripe__ public key to the `stripeKey` property (although we can if we want to). Instead, we are making use of environment variables provided by __CRA__ (create-react-app). To define some environment variables, we can create two files (there are more options here) - `.env.development` and `.env.production`. We are specifying there two files because we might (and should) use separate keys for development and production.

`.env.production`

```javascript
REACT_APP_STRIPE_KEY=our-public-key
```

`.env.development`

```javascript
REACT_APP_STRIPE_KEY=our-public-key
```

Important note, we need to prepend every environment variable with `REACT_APP_`, otherwise the will be ignored. CRA also provides us with one more environment variable that is set automatically -- `NODE_ENV` -- and we can use it to differentiate between development, test and production environment in our code. The value of `NODE_ENV` depends on how we run our application.

* __npm test__ - results in `test`
* __npm start__ - results in `development`
* __npm build__ - results in `production`

# 3 4 user interacts with stripe component

The `StripeCheckout` components generates a button which a user can click on to be presented with a payment form. Once the user fills the required fields, there is a submit button that sends data. Note that stripe API gives an option to work in test mode with fake credit card, but in that case we need to input __4242 4242 4242 4242__ as a credit card number.

# 5 6 7 form is submited to the stripe service

Once the form is submitted, the request is made directly to the stripe service (not to our backend API) so that we don't need to handle security and the sensitive information. The response from stripe service contains some billing information but we don't have access to the submitted credit card number, therefore we will not be storing it anywhere on our backend server.

This response is available as a first argument to the function assigned to `stripeKey` property. All we really need to do here is to send this received token data to our backend API service. Let's make an async action creator that uses __redux-thunk__ and __axios__ to handle this.

```javascript
export const handleStripeToken = token => async dispatch => {
    const response = await axios.post('/billing/charge', { token });

    dispatch({ type: FETCH_USER, user: response.data });
};
```

`/billing/charge` is some arbitrary url path on our server where we handle the token. Note that we are using relative url path here so that we don't need to worry about it once we push this application to the production where the domain would most likely change (also not that we need to setup a proxy here to reroute this request to our server, otherwise this relative url path would simply not work, at least not in the way we want them to).





