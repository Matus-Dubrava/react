# Multipage forms with redux-form

In this guide, we are going to look on how we may tackle the problem of creating multipage forms with **redux-form** module.

-   [installing redux form](#installing-redux-form)
-   [connecting to redux](#connecting-to-redux)
-   [usage in component](#usage-in-componnet)
-   [values validation](#values-validation)
-   [using custom fields](#using-custom-fields)
-   [rendering multiple fields](#rendering-multiple-fields)
-   [submitting form](#submitting-form)
-   [persisting state](#persisting-state)
-   [clearing state once submitted](#clearing-state-once-submitted)
-   [accesing state in form review](#accesing-state-in-form-review)

# installing redux form

To install **redux-form** we can simply run

```
npm install --save redux-form
```

Note, that **redux-form** makes use of **redux** therefore we need to introduce redux to our application as well if we are going to use redux-form module.

# connecting to redux

Once we have installed **redux-form** and did the basic redux setup in our application, we can start with some initialization. The first thing that we need to do is to hook redux-form with to our root reducer via `combineReducers` function available throught redux library.

Here is how we can to that.

```javascript
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
    form: formReducer
});
```

Note the `formReducer` alias here and `form` property in the combineReducers function. This property name -- `form` -- is mandatory (if we don't tell redux-form library otherwise).

# usage in component

Now that we have connected redux form with our redux store, we can start using it in our components.

Basic pattern of how to use redux form is to import `Field` component and `reduxForm` higher order component from redux form module.

We are going to need `Field` for creating, well, fields that communicate with redux store and `reduxForm` to decorate our component with and set up some properties such as the name of the form under which we can access the form's values in our redux store.

```javascript
import React from 'react';
import { Field, reduxForm } from 'redux-form';

const OrderForm = props => {
    return (
        <div>
            <form onSubmit={props.handleSubmit()}>
                <Field type="text" name="username" component="input" />
                <button type="submit" />
            </form>
        </div>
    );
};

export default reduxForm({
    form: 'orderForm'
})(OrderForm);
```

In the above example, we have created a very simple form with just one field called `username` and the name of the form, under which we can access the value of `username` in our redux store is `orderForm`.

# values validation

To validate values that a user types in to our field, we can set `validate` property of the object passed to the `reduxForm` decorator.

```javascript
import React from 'react';
import { Field, reduxForm } from 'redux-form';

const OrderForm = props => {
    return (
        <div>
            <form onSubmit={props.handleSubmit()}>
                <Field type="text" name="username" component="input" />
                <button type="submit" />
            </form>
        </div>
    );
};

function validate(values) {
    const errors = {};

    if (!values['username'] || !values['username'].length) {
        errors['username'] = 'This field is required.';
    }

    return errors;
}

export default reduxForm({
    form: 'orderForm',
    validate
})(OrderForm);
```

Here we are checking whether the `username` field is not empty and if it is, then we are assigning some appropriate error message to `errors.username` under which we can then access it via `meta` property assocaited with the field (see the next section).

# using custom fields

We have seen how to create a simple field using `Field` component by setting `component` property to `input` which indicates to redux form that we want this field to be vanilla text field and how to validate fields' values. This approach is completelly fine but sometimes, if we are going to render multiple fields, we might want to define some other elements in each field group such as `label`. In such case, we redux-form allows us to pass custom component to this `component` property.

Let's look on some example of custom form field and discuss some things that we need to take care of.

```javascript
import React from 'react';

const OrderField = ({ label, input, meta: { touched, error } }) => {
    return (
        <div>
            <label>{label}</label>
            <input {...input} />
            <p className="red-text">{touched && error}</p>
        </div>
    );
};

export default OrderField;
```

Property `input` that we are pulling out of props carries neccessaty properties that we need to spread on `input` element, otherwise it will not work correctly.

Next thing to mention is `touched` and `error` properties available through `meta` property. `touched` indicates whether a user touched a given field (clicked, tabbed... on in, or the form has been submitted) and `error` carries the particular error assiocated with this field. Here we are checking if both `touched` and `error` properties are truthy because we don't want to show any errors to the user before he/she touches the form.

# rendering multiple fields

While we surely can render fields by hand, it is usually preffered to create an array which will hold objects, each once representing one field (with properties such as name, placeholder, label, type, etc...) and then to loop through this array to produce the actual `Field` component.

Even better, we might store this, let's say, configuration object in some external file and each time we need to a do some stuff with these fiels (rendering the form, rendering form review page...), we can simply import this file. Advantage of such approach is that we are having only a single source of truth, single place where we are storing the information about the structure of the form and if we want to change it, well guess ..., we don't need to search for it in multiple locations, possibly creating some inconsistencies.

So, our file may look something like this.

```javascript
export default [
    { name: 'username', label: 'Your Name', type: 'text' },
    { name: 'age', label: 'Your Age', type: 'number' }
];
```

And then import it in our form component.

```javascript
import fileds from 'path-to-the-above-file';
...

const renderFields = fields.map(({ name, type, label }) => (
        <Field
            key={name}
            type={type}
            name={name}
            label={label}
            component={OrderField}
        />
    ));

<form>
    {renderFields}
</form>
...
```

# submitting form

To submit the form, all we need to do is to add some `button` to the form element and then specify `onSubmit` handler.

```javascript
<form onSubmit={props.handleSubmit(values => console.log(values))}>
    {renderFields}
</form>
```

The `handleSubmit` function is provided by **redux-form** and we can pass a callback function to it which automatically receives one argument by default, that is, values of all the fields that the form has. What we are goint to do with these values is up to us at the end of the day. For example, we can call some action creator here and sent these values to some server.

# persisting state

We might want to persist the state of the form, but why? By default, once the form component is unmounted, all the state is destroyed. For a single page form, this is probably the behavior that we would expect and one that is prefferable. On the other hand, in case of multipage forms, we might want to keep the state while a user is navigating through the form so that he/she can easily go back to some previous page and update some fields without having to type all the values again.

Fortunatelly, with redux-form, this is quite easy. All we have to do is to specify a property called `destroyOnUnmount` in the `reduxForm` decorator and set it to `false`.

```javascript
export default reduxForm({
    form: 'orderForm',
    validate,
    destroyOnUnmount: false
})(OrderForm);
```

At this point, event when our form component is unmounted, its state is persisted in redux store and if user navigates back to it, its fields are still filled.

# clearing state once submitted

In the previous section, we were talking about how to persist state of form while navigating around. Now, we probably still want to clear the form once a user submits it, or navigates away from it.

Achieving this is again kind of simple, but we need to setup our form in such a way that we we have some wrapper componnect around our forms (multiple pages of the same form) and overwrite the `destroyOnUnmount` there. By setting it to `false` on the parent component (note that the name of the form used on all the pages (in our case `orderForm`) **must be that same**), we are keeping the state of all the child forms (pages) while the parent (wrapper) is mounted but once it unmounts, the state is destroyed.

# accesing state in form review

Accessing the state of the form inside of some other component (assuming that we have persisted the state) is a trivial task since we storing it in our redux store.

All we need to do is to use `connect` decorator from `react-redux` to connect the component to store and the values for our, let's say, `orderForm` will be accessible through `form.orderForm.values`.

```javascript
const mapStateToProps = state => {
    return {
        orderFormValues: state.form.orderForm.values
    };
};

export default connect(mapStateToProps)(OrderForm);
```
