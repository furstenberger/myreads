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
    
    BooksAPI.getAll().then((bookList) => {
      console.log('tentou renderizar')
      this.setState({ bookList: bookList });
    })
  }

  // handle shelf changes in the server so user changes are saved accordingly
  // update bookList state
  handleShelfChange(book, newBookShelf) {
    BooksAPI.update(book, newBookShelf)
      .then( (res) => {
          
          this.setState((state) => {
          // if book already in personal book list, update state variable
          // find object index to update in state variables
          const index = state.bookList.map((e) => { return e.id }).indexOf(book.id);
          // upadte state variable according book ID and assign a new shelf state that renders when chaged
          // if book is new, there is nothing to do
          if (index != -1) {
            bookList: state.bookList[index].shelf = newBookShelf;
          } 
      })})
      .catch(err => console.error('Error occurred moving book: ', err));
  }

  render() {

    return (
      <div className="app">
        <Route path={"/search"} render={ () => (
          <Search books={this.state.bookList} onBookShelfChange={this.handleShelfChange.bind(this)}/>
        )}/>
        <Route exact path="/" render={ () => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <BookShelves bookShelves={this.state.bookShelves} books={this.state.bookList} onBookShelfChange={this.handleShelfChange.bind(this)} />
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
