import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Books from './Books';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import { Debounce } from 'react-throttle';

class Search extends Component {

    //propTypes to controle what is coming
    static propTypes = {
        books: PropTypes.array.isRequired,
        onBookShelfChange: PropTypes.func.isRequired
    };
    
    state  = {
        query: '',
        bookQuery: []
    }

    updateQuery = (query) => {

        this.setState({ query: query })
        console.log('Chamou query', query);
        BooksAPI.search(query)
            .then(bookQuery => {
                if (!bookQuery || bookQuery.error)
                    return [];

                let response = [];

                for (const searchedBook of bookQuery) {
                    for (const book of this.props.books) {
                        if (searchedBook.id === book.id) {
                            searchedBook.shelf = book.shelf;
                        }
                    }
                    response.push(searchedBook);
                }

                return response;
            })
            .then(bookQuery => {
                this.setState(state => ({ bookQuery }))
            })
            .catch(err => console.error('Error occurred searching books: ', err));

    }

    handleChange(book, value) {
        this.props.onBookShelfChange(book, value);
    }

    render() {
        
        const { query, bookQuery}  = this.state;
        const { books } = this.props;
        
        //let selectedBookList = [];
        //let isPresent = false;
        
/*         // go over each book of the query array of books to find if they are in the shelves
        bookQuery.forEach(searchedBook => {
            // reset flag
            isPresent = false;

            // check for ids in
            for (let i = 0 ; i < books.length ; i++){
                
                if (books[i].id === searchedBook.id) {
                      
                    isPresent = true;
                    break;
                    
                }
            }

            if (!isPresent) {
                selectedBookList.push(searchedBook);
            }

        }); */
        
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to={"/"} className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */
                        }
                        <Debounce time='500' handler='onChange'>
                            <input type="text"
                                placeholder="Search by title or author"
                                onChange={(event) => (this.updateQuery(event.target.value))}
                            />
                        </Debounce>
                    </div>
                </div>
                <div className="search-books-results">
                    {bookQuery.length !== 0 && (
                        <Books filteredBookList={bookQuery} onBookShelfChange={this.props.onBookShelfChange} />)
                    }
                    <ol className="books-grid"></ol>
                </div>
            </div>
        )
    }

}

export default Search;