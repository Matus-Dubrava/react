import React, { Component } from 'react';
import { connect } from 'react-redux';

import './BookForm.css';
import * as actions from '../../store/actions';

class BookFrom extends Component {
    state = {
        title: '',
        price: '',
        pages: ''
    }

    inputChangeHandler = (event, name) => {
        this.setState({
            [name]: event.target.value
        });
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        const newBook = {
            title: this.state.title,
            price: +this.state.price,
            pages: +this.state.pages
        };

        this.setState({
            title: '',
            price: '',
            pages: ''
        });

        this.props.onBookAdd(newBook);
        this.props.history.replace(`/${encodeURIComponent(newBook.title)}`);
    }

    render() {
        return (
            <form
                onSubmit={this.formSubmitHandler} 
                className="book-form">
                <input
                    onChange={(event) => this.inputChangeHandler(event, 'title')}
                    value={this.state.title}
                    placeholder="title"
                    name="title"
                    type="text" />

                <input
                    onChange={(event) => this.inputChangeHandler(event, 'price')}
                    value={this.state.price}
                    placeholder="price"
                    name="price"
                    type="number" />

                <input
                    onChange={(event) => this.inputChangeHandler(event, 'pages')}
                    value={this.state.pages}
                    placeholder="pages"
                    name="pages"
                    type="number" />
                
                <button
                    style={{
                        margin: '10px'
                    }}
                    className="btn btn--primary">Add Book</button>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onBookAdd: (book) => dispatch(actions.bookAdd(book))
    }
} 

export default connect(null, mapDispatchToProps)(BookFrom);