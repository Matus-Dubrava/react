import React, { Component } from 'react';
import { connect } from 'react-redux';

import './FullBook.css';
import * as actions from '../../store/actions';

class FullBook extends Component {
    render() {
        let book = <p>Select a book to see the detail.</p>;
        if (this.props.selectedBook) {
            book = (
                <React.Fragment>
                    <h3>{this.props.selectedBook.title}</h3>
                    <p>pages: {this.props.selectedBook.pages}</p>
                    <p>price: {this.props.selectedBook.price}</p>
                    <button
                        onClick={this.props.onBookDeselect}
                        className="btn btn--primary">Deselect</button>
                    <button 
                        onClick={() => this.props.onBookDelete(this.props.selectedBook)}
                        className="btn btn--danger">Delete</button>
                </React.Fragment>
            );
        }

        return (
            <div className="full-book">
                {book}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        selectedBook: state.books.selectedBook
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onBookDeselect: () => dispatch(actions.bookDeselect()),
        onBookDelete: (book) => dispatch(actions.bookDelete(book))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FullBook);