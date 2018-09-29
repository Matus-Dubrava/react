import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './Books.css';
import * as actions from '../../store/actions';

class Books extends Component {
    render() {
        const linkStyle = {
            color: '#444',
            textDecoration: 'none'
        };

        const books = this.props.books.map((book) => {
            return (
                <Link 
                    style={linkStyle}
                    key={book.title}
                    to={`/${encodeURIComponent(book.title)}`}>
                    <li
                        onClick={() => this.props.onBookSelect(book)}
                        className="books__item">
                        {book.title}
                    </li>
                </Link>
            );
        });

        return (
            <ul className="books">
                {books}
                <Link 
                    style={linkStyle}
                    to="/new-book">
                    <li
                        style={{ 
                            fontSize: '20px',
                            textAlign: "center" 
                        }}
                        className="books__item">+</li>
                </Link>
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
        onBookSelect: (book) => dispatch(actions.bookSelect(book))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Books);