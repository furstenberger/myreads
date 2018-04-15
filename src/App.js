import React from 'react'
import './App.css'
import BookShelves from './BookShelves'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Books from './Books';
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  
  
  
  state = {
    bookShelves: ['Currently Reading', 'Want to Read', 'Read'],
    query: '',
    bookQuery: []
  }

  updateQuery = (query) => {
    this.setState({ query: query })
    
    if (query !== "") {
      BooksAPI.search(query).then((res) => {
        this.setState({ bookQuery: res })
      });
    } else {
      this.setState({ bookQuery: [] })
    };
  }

  render() {

    const { query, bookQuery } = { query: this.state.query, bookQuery: this.state.bookQuery};

    return (
      <div className="app">
        <Route path={"/search"} render={ () => (
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
                console.log(this.state.bookQuery)
                }
                <input  type="text" 
                        placeholder="Search by title or author"
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                />
              </div>
            </div>
            <div className="search-books-results">
              { bookQuery.length !== 0  && (
                <Books filteredBookList={bookQuery} />)
              }
              <ol className="books-grid"></ol>
            </div>
          </div>
        )}/>
        <Route exact path="/" render={ () => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BookShelves bookShelves={this.state.bookShelves} />
            <div className="open-search">
              <Link to={"/search"}>Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
