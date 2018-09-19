import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actionCreators from './store/actions/index';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let orders = <Redirect to="/" />;
    let checkout = <Redirect to="/" />;

    if (this.props.isAuthenticated) {
      orders = <Route path="/orders" component={Orders} />;
      checkout = <Route path="/checkout" component={Checkout} />; 
    }

    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/auth" component={Auth} />
            {checkout}
            {orders}
            <Route path="/logout" component={Logout} />
            <Route path="/" component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actionCreators.authCheckState())
  }; 
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
