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
    
    // if query is empty, clean the bookArray to render a clean screen, 
    if (query !== '') {
      BooksAPI.search(query)
        .then((res) => {
          // here it must be clear that query and state query are the same due to async fetch of queries resolution
          if (query === this.state.query) {
            this.setState({ bookQuery: res })
          }})
        .catch((err) => {
          console.log('Error occurred searching books: ', err);          
      });
    }
    else { 
      console.log('quando query vazio o valor de bookQuery e: ', this.state.bookQuery)
      this.setState({ bookQuery: [] });
    }
  }

  // handle shelf changes in the server so user changes are saved accordingly
  // update bookList state
  handleShelfChange(book, newBookShelf) {
    //console.log(book);
    BooksAPI.update(book, newBookShelf).then(() => {
      this.setState((state) => {
        // find object index to update in state variables
        const index = state.bookList.map((e) => { return e.id }).indexOf(book.id);
        // upadte state variable according book ID and assign a new shelf state that renders when chaged
        bookList: state.bookList[index].shelf = newBookShelf;
      });
    })
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
                <Books filteredBookList={bookQuery} onBookShelfChange={(book, newBookShelf) => this.handleShelfChange(book, newBookShelf)} />)
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
