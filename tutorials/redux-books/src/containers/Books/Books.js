import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Books.css';
import * as actions from '../../store/actions';

class Books extends Component {
    render() {
        const books = this.props.books.map((book) => {
            return (
                <li
                    onClick={() => this.props.onBookSelect(book)}
                    className="books__item"
                    key={book.title}>
                    {book.title}
                </li>
            );
        });

        return (
            <ul className="books">
                {books}
                <li
                    onClick={this.props.onBookAddInit}
                    style={{ 
                        fontSize: '20px',
                        textAlign: "center" 
                    }}
                    className="books__item">+</li>
            </ul>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        books: state.books.books
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onBookSelect: (book) => dispatch(actions.bookSelect(book)),
        onBookAddInit: () => dispatch(actions.bookAddInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Books);