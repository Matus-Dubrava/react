* [higher order components](#higher-order-components)
* [lazy loading](#lazy-loading)

## higher order components

Higher order component __HOC__ is technically not a component on its own, instead, it is a function that take component as its argument and return new component that wraps the passed in one. So what is the difference between a normal component and the one that is returned from such function and why should we consider using it? Well, there is no difference. The main idea is that __HOC__ helps us to reuse some pieces of code that we might end up copying throughout our components otherwise. Let's assume a simple example where using one is probably a good idea -- guarding routes from non-authenticated access. There may be a lot of routes that we want to allow access to only when a user is logged in. The problem that we have to solve here to keep our code *dry* is how to reuse the same piece of code (some kind of redirection logic) for each component without copying it over each time. The answer to this question is __HOC__. What we can do is to outsorce that repeatable code into separate file that returns the above mentioned function and reuse it each time we need to redirect unauthenticated users away from some routes.

Here are the steps that we will need to take when building any __HOC__.

* create a function that expects a component as its argument (note that this functiom can take more than just one argument)
* create a new component (can be either stateless or statefull, but usually it is a statefull component)
* pass any props that are passed to this wrapper component down to its child component, which is the passed in component
* return the newly created component from the function

Now that we have a clearer idea of how to implement our own __HOC__, let's try to create the above mentioned guarding component that we will call __requireAuth__. Inside of it, we will use __react-router-dom__ module to programatically navigate anonymous users away by using __history.replace__ method provided by it. We will execute this method in both __componentDidMount__ and __componentDidUpdate__ methods based on information about user's authentication status, which we can name __isAuthenticated__ (a boolean flag), provided by redux.

```javascript
import React, { Component } from 'react';
import { connect } from 'react-redux';

const requireAuth = (ChildComponent) => {
    class ComposedComponent extends Component {
        componentDidMount() {
            this.navigateAway();
        }
    
        componentDidUpdate() {
            this.navigateAway();
        }
    
        navigateAway() {
            if (!this.props.isAuthenticated) {
                // history object is provided by BrowserRouter from react-router-dom module
                this.props.history.replace('/');
            }
        }

        render() {
            // here we are spreading props passed to ComposedComponent
            // down to the ChildComponent so that we don't lose access to them
            return <ChildComponent {...this.props} />
        }
    }

    const mapStateToProps = (state) => {
        return {
            // just a simple boolean flag
            isAuthenticated: state.auth.isAuthenticated
        };
    }

    return connect(mapStateToProps)(ComposedComponent);
}

export default requireAuth;
```

## lazy loading

The idea behind lazy loading is to load some component asynchronously, only when they are actualy needed so that our JavaScript code doesn't need to be downloaded all at once. This can improve user experience if the components are big in size. 

If we are using preconfigured webpack with *create-react-app* then we can create a higher order component in our JavaScript project and use it to load some of our components that are not immediately needed when the user enters our page.

__asyncComponent.js__

```javascript
import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        }

        componentDidMount() {
            importComponent()
                .then((cmp) => {
                    this.setState({ component: cmp.default });
                });
        }

        render() {
            const C = this.state.component;
            return C ? <C {...this.props} /> : null;
        }
    }
}

export default asyncComponent;
```

Here, asyncComponent is a function that takes another function as its only argument (this function is aynchronous) and return a new statefull component. Once this returned component is mounted, we then call that callback function and assign the obtained component to the newly created component's state.

In a render method, we try to render that obtained component if it exists and pass whatever props it received. If the async function wasn't loaded then we simply return *null*.

In our root component, or any other component which needs to load another components that we want to load lazyly, we need to remove the old import statement and replace it with function definition.

Instead of 

```javascript
import MyComponent from 'path-to-MyComponent';
```

We do 

```javascript
const asyncMyComponent = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});
```

where __asyncComponent__ is the function that we have definied earlier. Here we are using *import* as a function not as a statement and calling it inside of callback passed to the __asyncComponent__ function.

Last thing to do is to use this __asyncMyComponent__ (component obtained by calling __asyncComponent__) in place where we would normally have used the Components obtained by import statement.

E.g.

```javascript
<Route path="/mycomponent" component={asyncMyComponent} />
```

Note that this logic has any meaning only when we are not actually needing the component right away, such as in case of using *Route*.
