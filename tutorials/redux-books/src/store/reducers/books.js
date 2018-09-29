import * as actionTypes from '../actions/actionTypes';

const createSlug = (title) => {
    return encodeURIComponent(title);
}

const initialState = {
    books: [
        {
            title: 'The Dark Tower',
            pages: 412,
            price: 32,
            slug: createSlug('The Dark Tower')
        },
        {
            title: 'Javascript: The Good Parts',
            pages: 164,
            price: 17,
            slug: createSlug('Javascript: The Good Parts')
        },
        {
            title: 'Eloquent Ruby',
            pages: 512,
            price: 42,
            slug: createSlug('Eloquent Ruby')
        },
        {
            title: 'Society of Mind',
            pages: 279,
            price: 36,
            slug: createSlug('Society of Mind')
        }
    ],
    selectedBook: null
};

const bookSelect = (state, action) => {
    return {
        ...state,
        selectedBook: action.selectedBook
    }
};

const bookDeselect = (state, action) => {
    return {
        ...state,
        selectedBook: null
    };
};

const bookDelete = (state, action) => {
    const updatedBooks = state.books.filter((book) => {
        return book.title !== action.book.title
    });

    return {
        ...state,
        selectedBook: null,
        books: updatedBooks
    };
};

const bookAdd = (state, action) => {
    const newBook = action.book;
    newBook.slug = createSlug(action.book.title);

    return {
        ...state, 
        selectedBook: action.book,
        books: [...state.books, action.book]
    };
};

const reducer =  (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.BOOK_SELECT: return bookSelect(state, action);
        case actionTypes.BOOK_DESELECT: return bookDeselect(state, action);
        case actionTypes.BOOK_DELETE: return bookDelete(state, action);
        case actionTypes.BOOK_ADD: return bookAdd(state, action);
        default: return state;
    }
};

export default reducer;