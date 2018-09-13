<p>
  In <em>App.js</em> file we are importing both <em>BrowserRouter</em> and <em>Route</em> components.
</p>

```
import { BrowserRouter, Route } from 'react-router-dom';
```

<p>
  We are wrapping whole App JSX code with <em>BrowserRouter</em> 
  and then using <em>Route</em> component to specify what code should be rendered for which path 
</p>

```
<BrowserRouter>
    <div className="App">
        <Header />

        <Route 
            path='/'
            exact
            render={() => <h1>This is Home section</h1>} />
        <Route 
            path='/products'
            exact
            render={() => <h1>This is Products section</h1>} />
        <Route 
            path='/pricing'
            exact
            render={() => <h1>This is Pricing section</h1>} />
    </div>
</BrowserRouter>
```