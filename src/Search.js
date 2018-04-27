import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Books from './Books';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'

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

        // if query is empty, clean the bookArray to render a clean screen, 
        if (query !== '') {
            BooksAPI.search(query)
                .then((res) => {
                    // here it must be clear that query and state query are the same due to async fetch of queries resolution
                    if (query === this.state.query) {
                        this.setState({ bookQuery: res })
                    }
                })
                .catch((err) => {
                    console.log('Error occurred searching books: ', err);
                });
        }
        else {
            this.setState({ bookQuery: [] });
        }
    }

    handleChange(book, value) {
        this.props.onBookShelfChange(book, value);
    }

    render() {
        
        const query = this.state.query;
        const bookQuery = this.state.bookQuery;
        const books = this.props.books;
        let selectedBookList = [];
        let isPresent = false;
        
        // go over each book of the query array of books to find if they are in the shelves
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

        });
        
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
                        <input type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    {bookQuery.length !== 0 && (
                        <Books filteredBookList={selectedBookList} onBookShelfChange={this.props.onBookShelfChange} />)
                    }
                    <ol className="books-grid"></ol>
                </div>
            </div>
        )
    }

}

export default Search;