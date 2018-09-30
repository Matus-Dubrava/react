* [enzyme setup](#enzyme-setup)
* [first test](#first-test)
* [beforeEach function](#beforeEach-function)

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
* __fulldom__ - renders the component and all of it child components

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

