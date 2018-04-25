import React from 'react'
import './App.css'
import BookShelves from './BookShelves'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Books from './Books';
import * as BooksAPI from './BooksAPI'
import Search from './Search';

class BooksApp extends React.Component {
  
  state = {
    bookShelves: ['Currently Reading', 'Want to Read', 'Read'],
    bookList: []
  }

  componentDidMount() {
    
    BooksAPI.getAll().then((bookList) => {
      this.setState({ bookList: bookList });
    })
  }

  render() {

    return (
      <div className="app">
        <Route path={"/search"} render={ () => (
          <Search books={this.state.bookList}/>
        )}/>
        <Route exact path="/" render={ () => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BookShelves bookShelves={this.state.bookShelves} books={this.state.bookList} />
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
