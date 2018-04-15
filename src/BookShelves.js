import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Books from './Books';
import * as BooksAPI from './BooksAPI'

class BookShelves extends Component {

    //propTypes to controle what is coming
    static propTypes = {
        bookShelves: PropTypes.array.isRequired
    };
    
    // state variables
    state = {
        bookList: []
    };

    componentDidMount() {
        BooksAPI.getAll().then((bookList) => {
            this.setState({ bookList: bookList });
        })
    }

    // Assign correct shelf for Books Component to render
    shelfFilter(shelf) {

        let filter = '';

        if (shelf === "Currently Reading") { filter = "currentlyReading" };
        if (shelf === "Want to Read") { filter = "wantToRead" };
        if (shelf === "Read") { filter = "read" };

        return this.state.bookList.filter((books) => books.shelf === filter);

    }

    //render as many as book shelves you want from App component mapping from the props bookShelves array
    //also filter Books Component according to current book shelf
    render() {

        const bookShelves = this.props.bookShelves;

        return (
            <div className="list-books-content">
                <div>
                    {bookShelves.map( (shelf, index) => (
                        <div className="bookshelf" key={index}>
                            <h2 className="bookshelf-title">{shelf}</h2>
                            <div className="bookshelf-books"></div>
                            <Books filteredBookList={this.shelfFilter(shelf)} />
                        </div>
                    ))}      
                </div>
            </div>
        );
    }
}

export default BookShelves;
