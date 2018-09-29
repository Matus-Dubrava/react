import * as actionTypes from './actionTypes';

export const bookSelect = (selectedBook) => {
    return {
        type: actionTypes.BOOK_SELECT,
        selectedBook
    };
};

export const bookDeselect = () => {
    return {
        type: actionTypes.BOOK_DESELECT
    };
};

export const bookDelete = (book) => {
    return {
        type: actionTypes.BOOK_DELETE,
        book
    };
};

export const bookAdd = (book) => {
    return {
        type: actionTypes.BOOK_ADD,
        book
    };
};
