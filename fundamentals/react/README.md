* [lazy loading](#lazy-loading)

## lazy loading

The idea behind lazy loading is load some component asynchronously, only when they are actualy needed so we are not loading the whole JavaScript code at once. This can improve user experience if the components are big in size. 

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

In our root components, or any other component which needs to load another components that we want to load lazyly, we need to remove the old import statement and replace it with function definition.

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

where __asyncComponent__ is the function that we have definied earlier. Here we are using *import* as a function not as a statement and calling it inside of callback passed to __asyncComponent__ function.

Last thing to do is to use this __asyncMyComponents__ in place where we would normally used the Components obtained by import statement.

E.g.

```javascript
<Route path="/mycomponent" component={asyncMyComponent} />
```

Note that this logic has any meaning only when we are not actually needing the component right away, such as in case of using *Route*.