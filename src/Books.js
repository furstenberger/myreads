import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noCover from './icons/No-cover-placeholder.png'


// Book Component - renders list of books
class Books extends Component {
    
    //propTypes to controle what is coming
    static propTypes = {
        filteredBookList: PropTypes.array.isRequired
    };

    handleChange(book, event) {
        this.props.onBookShelfChange(book, event.target.value);
    }

    handleImgFallback(book) {
        // these are fallbacks in case of images are missing
        return book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : noCover

    }

    handleTitleFallback(book) {
        // this fallbacks in case of titles are missing
        return book.title ? book.title : "No title available"
    }
    
    // render method
    // the books are rendered according to filteredBookList
    render () {

        return ( 
            <ol className="books-grid">
                {this.props.filteredBookList.map((book) => (
                    <li key={book.id}>     
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${this.handleImgFallback(book)})` }}></div>
                                <div className="book-shelf-changer">
                                    <select value={book.shelf ? book.shelf : 'none'} onChange={this.handleChange.bind(this, book)}>
                                        <option value="none">Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{this.handleTitleFallback(book)}</div>
                            {/* if more than one author, test and render with a comma between the names */}
                            <div className="book-authors">{book.authors && (book.authors.join(', '))}</div>
                        </div>
                    </li>
                ))}
            </ol>
        );
    }
}

export default Books;