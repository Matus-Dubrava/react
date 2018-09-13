# react-router quickstart

<ul>
  <li>first we need to install module <em>react-router-dom</em> to our project - <strong>npm install react-router-dom --save</strong></li>
  <li>then we need to <strong>import { BrowserRouter } from 'react-router-dom'</strong>, this is a higher order component with which we need 
      to wrap part of our application where we want to perform the actual routing</li>
  <li>in a component where we want to perform routing, we neet to <strong>import { Route } from 'react-router-dom'</strong> which is 
      a self-closing component</li>
  <li>we use the imported <em>Route</em> component to perform routing
  ```
  <Route path="some path" exact render={() => ...} 
  ```
  <ul>
    <li><em>path</em> - url path</li>
    <li><em>exact</em> - route should be triggered only when the url pattern is matched exactly as is</li>
    <li><em>render</em> - expect a function that returns whatever we want to render - JSX code, component...</li>
    <li><em>component</em> - we use component if we want to load whole component, we need to pass the component object as a value for this property</li>
    ```
    <Route path="some path" exact component={MyComponent}}
    ```
  </ul>
  </li>
</ul>
