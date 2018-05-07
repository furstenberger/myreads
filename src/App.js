import React from 'react'
import './App.css'
import BookShelves from './BookShelves'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import Search from './Search';

class BooksApp extends React.Component {
  
  state = {
    bookShelves: ['Currently Reading', 'Want to Read', 'Read'],
    bookList: []
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then( bookList => {
      this.setState({ bookList: bookList });
    })
  }

  // handle shelf changes in the server so user changes are saved accordingly
  // update bookList state
  handleShelfChange = (book, newBookShelf) => {
    console.log('passa aqui')
    console.log(book)
    console.log(newBookShelf)
    BooksAPI.update(book, newBookShelf)
      .then(this.setState( prevState => {
          let isFound = false;
          const newState = prevState.bookList.map( b => {
            if (b.id === book.id) {
              b.shelf = newBookShelf;
              isFound = true;
            }
            return b;
          });
          if (!isFound) {
            book.shelf = newBookShelf;
            newState.push(book);
          }
          return {bookList: newState};
        }))
      .catch(err => console.error('Error occurred moving book: ', err));
  }

  render() {
    console.log('new render')
    console.log(this.state.bookList)
    return (
      <div className="app">
        <Route path="/search" render={({ history }) => (
          <Search books={this.state.bookList} onBookShelfChange={this.handleShelfChange}/>
        )}/>
        <Route exact path="/" render={ () => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BookShelves bookShelves={this.state.bookShelves} books={this.state.bookList} onBookShelfChange={this.handleShelfChange} />
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
