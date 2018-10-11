This guide shows how we can handle basic credit payments with Stripe, React (and Node, Express, Mongoose). We assume that we have access to the node server with implemented authentication process using cookies and access to the authenticated user via __req.user__ inside of our middleware functions and routes (although it can be easily tweeked to work with any authentication scheme).

Let's look on a diagram that shows the flow of actions that we need to handle when we want to implement simple Stripe payments. And by simple I mean one-time payments that we are going to exchange for credits that can be used to buy something on our page, whether some product or service.

![react stripe flow diagram](https://github.com/Matus-Dubrava/react/blob/master/fundamentals/react/react-stripe-credit-payments/react-stripe-flow.png)

* [1. client and server setup](#1.-client-and-server-setup)

# 1. client and server setup

Here I would only like to mention some modules that we are going to need to make use of Stripe payments (modules related to stripe).

On the client side, we are goint to use `react-stripe-checkout` module.

`npm install --save react-stripe-checkout` (in the client _package.json_ file)

On the server side, we need to install `stripe` module.

`npm install --save stripe` (in the server _package.json_ file)





