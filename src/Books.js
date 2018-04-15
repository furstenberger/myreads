import React, { Component } from 'react';
import PropTypes from 'prop-types';


// Book Component - renders a single book
class Books extends Component {
    
    //propTypes to controle what is coming
    static propTypes = {
        bookList: PropTypes.array.isRequired,
    };
    
    // state variables
    state = {
        shelf: ''
    };
    
    // render method
    render () {

        const bookList = this.props.bookList;

        return ( 
            <ol className="books-grid">
                {bookList.map((book) => (
                    <li>    
                        <div className="book" key={book.id}>
                            <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                    <select>
                                        <option value="none" disabled>Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <div className="book-authors">{book.authors.join(', ')}</div>
                        </div>
                    </li>
                ))}
            </ol>
        );
    }
}

export default Books