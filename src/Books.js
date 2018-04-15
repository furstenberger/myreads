import React, { Component } from 'react';
import PropTypes from 'prop-types';


// Book Component - renders a single book
class Books extends Component {
    
    //propTypes to controle what is coming
    static propTypes = {
        filteredBookList: PropTypes.array.isRequired
    };

    handleChange(value) {
        console.log(value);
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
                                <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                    <select onChange={(event) => this.handleChange(event.target.value)}>
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

export default Books;