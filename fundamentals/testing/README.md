* [enzyme setup](#enzyme-setup)
* [first test](#first-test)
* [beforeEach function](#beforeeach-function)
* [afterEach function](#aftereach-function)
* [testing controlled input](#testing-controlled-input)
* [testing redux connected components](#testing-redux-connected-components)
* [testing a reducer](#testing-a-reducer)

## enzyme setup

This guide assumes that we have __Jest__ test runner already configured, by hand, or by using __create-react-app__ which automatically does that for us.

If we want to start using enzyme, first thing to do is to install two packages: __enzyme__ and __enzyme-adapter-react-[version number]__

The version number must much the version number of __react__ that we are using in our project. 
```
npm install --save enzyme enzyme-adapter-react-16
```

Once we have installed these two dependecies, we need to set up a configuration file inside of our __src__ folder and name it __setupTests.js__. The name is crucial because enzyme will automatically scan the src folder for the file with that exact name and extracts the configuration specified inside of it.

*/src/setupTests.js*
```javascript
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
    adapter: new Adapter()
});
```

And that is it. Now we are ready to start using enzyme inside of our test files to test React components.

## first test
In this seaction, we are going to write our first test using __enzyme__. We will start with a pretty simple test that will make sure that one component __App__ correctly renders another component __Comments__ inside of it. 

For that, we first need to write these two components.

*App.js*
```javascript
import React from 'react';

import Comments from 'path-to-comments-file';

const app = () => {
    return (
        <div>
            <Comments />
        </div>
    );
};

export default app;
```

*Comments.js*
```javascript
import React from 'react';

const comments = () => {
    return (
        <div>
            This is a comments component.
        </div>
    );
};

export default comments;
```

With these two files in place, we can write our test file for __App__ component. For that, we need to create a new file called __App.test.js__. The name before __.test.js__ is optional but the __.test.js__ is mandatory so that Jest can automatically pict this file up and run tests inside of it.

Inside of our app test file, we will need to import some enzyme renderer, which is a function that allows us to easily test react components by rendering the components. There are 3 different renderers that we can use and each of them renders the passed in components in a slightly differenct fassion.

* __static__ - renders components and returns a plain html file 
* __shallow__ - renders only the passed in components, all the other components inside of this component are replaced by placeholders without them being rendered.
* __mount__ - renders the component and all of it child components (full DOM renderer)

In our first test, we will make use of __shallow__ renderer.

*App.test.js*
```javascript
import React from 'react';
import { shallow } from 'enzyme';

import App from 'path-to-app-file';
import Comments from 'path-to-comments-file';

it('should show a single Comments component', () => {
    const wrapped = shallow(<App />);

    expect(wrapped.find(Comments).length).toEqual(1);
});
```

Now we can run ```npm test``` command which will start the Jest test runner and then it runs all the test files that it finds. After the tests have been completed, either passing or failing, Jest will keep listening for changes in our project and once it notices a change, it reruns all the tests.

__Note__ that we have used method __find__ here to find a specific component but it can be used to find any normal html element as well by passing a valid css selector to it.

## beforeEach function

We may find ourself in a situation where we are repeating the same code over and over in our individual test cases. Example might be taken from the above __App.test.js__ where we are initializing __wrapped__ variable to hold the component rendered by shallow function. While there is no code repetition in that particular example, imagine that we have another component called __SearchBox__ and we want to test whether that __App__ component includes this SearchBox in it as well.

*App.test.js*
```javascript
import React from 'react';
import { shallow } from 'enzyme';

import App from 'path-to-app-file';
import Comments from 'path-to-comments-file';
import SearchBox from 'path-to-searchbox-file';

it('should show a single Comments component', () => {
    const wrapped = shallow(<App />);

    expect(wrapped.find(Comments).length).toEqual(1);
});

it('should show a single SearchBox component', () => {
    const wrapped = shallow(<App />);

    expect(wrapped.find(SearchBox).length).toEqual(1);
});
```

In the example above, we can see that we are already duplicating the __wrapped__ variable initialization. And we can have many such test cases, not just 2, where we need this exact code. 

To remove this duplicity from our code, we can make use of __beforeEach__ function that is provided by our test runner and what it does is that it is simply executed before each test case is executed. 

*App.test.js*
```javascript
import React from 'react';
import { shallow } from 'enzyme';

import App from 'path-to-app-file';
import Comments from 'path-to-comments-file';
import SearchBox from 'path-to-searchbox-file';

let wrapped = null;
beforeEach(() => {
    wrapped = shallow(<App />);    
});

it('should show a single Comments component', () => {
    expect(wrapped.find(Comments).length).toEqual(1);
});

it('should show a single SearchBox component', () => {
    expect(wrapped.find(SearchBox).length).toEqual(1);
});
```

## afterEach function

This function serves a similar purpos as the above __beforEach__, it is called after each test case and we can do some clean up here. This is useful in case that we want to reset some values or when we want to unmount some component. In case of __shallow__ renderer, the component doesn't get mounted, but in case of full DOM rendering using __mount__ renderer, the component passed to it actually gets mounted and it is a good idea to unmount it after each test case so that we don't accidentally polute our tests.

```javascript
import MyComponent from '...';
import { mount } from 'enzyme';

let wrapped = null;

beforeEach(() => {
    wrapped = mount(MyComponent);
});

afterEach(() => {
    wrapped.unmount();
});
```

## testing controlled input

Testing a controlled input (controlled by react state) is a little bit more challenging. There are several steps that we need to take to accomplish this task.

We need to
1. find the input field
2. simulate an event 
3. mock the event object (in some cases)
4. force state update
5. check if the new value is the one that we expect

Let's have a component that contains a form which we want to test for these things
* it should have a form element
* it should have an input element
* it should have a button element
* once the user types some text into the input field, its value is updated 
* when the user submits the form, the value of input field is cleared

*InputBox.js* - our input component
```javascript
import React, { Component } from 'react';

class InputBox extends Component {
    state = {
        inputValue: ''
    }

    inputChangeHandler = (event) => {
        this.setState({ inputValue: event.target.value });
    }

    formSubmitHandler = (event) => {
        event.preventDefault();

        this.setState({ inputValue: '' });
    }

    render() {
        return (
            <form onSubmit={this.formSubmitHandler}>
                <input 
                    onChange={this.inputChangeHandler}
                    value={this.state.inputValue} />
                <button>Submit</button>
            </form>
        );
    }
}
export default InputBox;
```

Here is a basic test setup.
```javascript
import React from 'react';
import { shallow } from 'enzyme';

import InputBox from '...';

let wrapped = null;

beforeEach(() => {
    wrapped = shallow(<InputBox />);
});
```

Now we can test whether the input component contains the form, button and input field.

```javascript
it('should have a form', () => {
    expect(wrapped.find('form').length).toEqual(1);
});

it('should have an input field', () => {
    expect(wrapped.find('input').length).toEqual(1);
});

it('should have a button', () => {
    expect(wrapped.find('button').length).toEqual(1);
});
```

The next thing to test for is - *once the user types some text into the input field, its value is updated* and 
according to the steps mentioned early, we need to find the input element. This can be accompished by using __find__ method 
that we have already seen.

```javascript
wrapped.find('input')
```

Then we need to simulate some event, in this case we are simulating __change__ event. For this, we can use __simulate__ method provided by enzyme which takes 2 arguments - event type and an optional mock event. We will make use of both here because we want to mock the event to carry __target.value__ on it (event.target.value) which we are using in our component to update the value of the react state.

```javascript
wrapped.find('input').simulate('change', {
    target: { value: 'some input text' }
});
```

Next thing to do is to force the state to be updated. We need to do this because state in react is updated asynchronously, meaning that the value is not changed immediatelly but only after event loop picks the callback up. In our tests, we don't want to wait for this asynchronous code to be executed, therefore we need to use another method provided by enzyme called __update__ which forces the state to be updated synchronously.
```javascript
wrapped.find('input').simulate('change', {
    target: { value: 'some input text' }
});

wrapped.update();
```

Finally, we can check the value of input field by using __prop([key])__ method which returns a value of a given property.

```javascript
wrapped.find('input').simulate('change', {
    target: { value: 'some input' }
});

wrapped.update();

expect(wrapped.find('input').prop('value')).toEqual('some input');
```

And that is it for input testing, therefore we can turn our attention to the line *when the user submits the form, the value of input field is cleared*.

The steps that we are going to take here are similar to the ones above, but instead of simulating __change__ event on input field, we are going to simulate __submit__ event on the actual form.

```javascript
it('should have an input that gets emptied once the form is submitted', () => {
    wrapped.find('input').simulate('change', {
        target: { value: 'some input' }
    });
    wrapped.update();
    expect(wrapped.find('input').prop('value')).toEqual('some input');

    wrapped.find('form').simulate('submit', { preventDefault() {} });
    wrapped.update();
    expect(wrapped.find('input').prop('value')).toEqual('');
});
```

Here we are providing the mock event with __preventDefault__ function because it doesn't have one and if we try to run our test without faking it, the Jest test runner will complain that it can't execute function that doesn't exists. (note that this is an issue only in case of __shallow__ renderer, if we choose to use __mount__ instead, we will not need to provide a fake __preventDefault__ method).

## testing redux connected components

Considering the above comments form, we might want to introduce redux into our application so that once the user submits the form, the comment will be stored inside of the redux state container. For that, we need to use __connect__ function from __react-redux__ module to connect the component to our store. We also need to wrap our root component (technically it doesn't need to be a root component) with a __Provider__ components which is provided by the same module.

The problem that we will have to face is that for react and redux to work correctly together, connected components need to have access to the redux store via __Provider__ component. But since we are testing only a single component in our test file, without rendering the whole DOM, the tested component don't have this access and so our tests will not work. 

To solve this issue, we can create a new functional component, let's call it __Root__, which will be wrapped by __Provider__ component and it will wrap whatever component it receives via __children__ property. We can then export this component and use it inside of our index file to wrap the __App__ component (or however you named your 'root' component) as well as inside of any test file where we are testing a connected component that needs an access to the redux store.

Let's look on an example of root index.js file where we are setting up our react application.

*old index.js*
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';

import App from './App';
import rootReducer from './store/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware()));

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
```

Now, let's try to refactor some of the code above into a separate component as we have described and reuse it in both this file and test.js files.

*Root.js*
```javascript
import React from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './store/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware()));

export default (props) => {
    return (
        <Provider store={store}>
            {props.children}
        </Provider>
    );
};
```

*new index.js*
```javascript
import ReactDOM from 'react-dom';
import React from 'react';

import App from './components/App';
import Root from './Root';

const app = (
    <Root>
        <App />
    </Root>
);

ReactDOM.render(app, document.getElementById('root'));
```

*our test file*
```javascript
import React from 'react';
import { shallow } from 'enzyme';

import Root from '...';
import InputBox from '...';

let wrapped = null;
beforeEach(() => {
    wrapped = shallow(
        <Root>
            <InputBox />
        </Root>
    );
});
```

After wrapping __InputBox__ component in our test file, it has access to the redux store, therefore are test will start passing again.

## testing a reducer
Now that we have a clear way of testing a redux connected components, we can start thinking about how to test our reducers. This is actually a pretty simple task since reducers are pure function without any side-effects that are communicating with the external environment only via two input arguments - state and action - and then they return a new state.

So all we need to do is to create an object that represents some action, another object that represents the state and then check, whether the returned state is the one that we expect it to be.

Let's consider a simple reducer that handles only one action type __ADD_COMMENT__ and once the reducer receives action of this type, it simply adds a new entry to its state, where this entry is a comment (a string) carried in a payload of that action.

*commentsReducer.js*
```javascript
const initialState = {
    comments: []
};

const addComment = (state, action) => {
    return {
        ...state,
        comments: [...state.comments, action.comment]
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_COMMENT': return addComment(state, action);
        default: return state;
    }
};

export default reducer;
```

We might want to test two things here. First, we can check whether the reducer stores a comment carried by action of the type __ADD_COMMENT__ and then we might consider an action with unknown type and check whether the reducer just ignores it as it should, without throwing any error.

```javascript
import commentsReducer from '../comments';

let initialState = null;
beforeEach(() => {
    initialState = { comments: [] };
});

it('should handle actions of type "ADD_COMMENT"', () => {
    const action = {
        type: 'ADD_COMMENT',
        comment: 'new comment'
    };

    const newState = commentsReducer(initialState, action);

    expect(newState.comments).toEqual(['new comment']);
});

it('should handle actions with unknown type without throwing an error', () => {
    const action = {
        type: 'SOME_RANDOM_ACTION_TYPE_123144912102',
        payload: 'dmidaosd'
    };

    const newState = commentsReducer(initialState, action);

    expect(newState.comments).toEqual([]);
});
```




