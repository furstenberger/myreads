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

    // handle shelf changes in the server so user changes are saved accordingly
    // update bookList state
    handleShelfChange(book, newBookShelf) {
        //console.log(book);
        BooksAPI.update(book, newBookShelf).then(() => {
            this.setState((state) => {
                // find object index to update in state variables
                const index = state.bookList.map((e) => {return e.id}).indexOf(book.id);
                // upadte state variable according book ID and assign a new shelf state that renders when chaged
                bookList: state.bookList[index].shelf = newBookShelf; 
            });
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
                            <Books filteredBookList={this.shelfFilter(shelf)} onBookShelfChange={(book, newBookShelf) => this.handleShelfChange(book, newBookShelf)} />
                        </div>
                    ))}      
                </div>
            </div>
        );
    }
}

export default BookShelves;
