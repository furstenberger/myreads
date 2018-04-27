import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Books from './Books';

class BookShelves extends Component {

    //propTypes to controle what is coming
    static propTypes = {
        bookShelves: PropTypes.array.isRequired,
        books: PropTypes.array.isRequired,
        onBookShelfChange: PropTypes.func.isRequired
    };

    handleChange(book, value) {
        this.props.onBookShelfChange(book, value);
    }

    // Assign correct shelf for Books Component to render
    shelfFilter(shelf) {
        
        let filter = '';

        if (shelf === "Currently Reading") { filter = "currentlyReading" };
        if (shelf === "Want to Read") { filter = "wantToRead" };
        if (shelf === "Read") { filter = "read" };

        return this.props.books.filter((books) => books.shelf === filter);
        
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
                            <Books filteredBookList={this.shelfFilter(shelf)} onBookShelfChange={this.props.onBookShelfChange} />
                        </div>
                    ))}      
                </div>
            </div>
        );
    }
}

export default BookShelves;
