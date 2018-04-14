import React, { Component } from 'react';


// Book Component - renders a single book
class Book extends Component {
    
    //propTypes to controle what is coming
    static propTypes = {
        title: PropTypes.string.isRequired,
        author: PropTypes.array.isRequired,
        thumbnail: PropTypes.string.isRequired
    };
    
    // state variables
    state = {
        shelf: ''
    };
    
    // render method
    render () {

        // array destructuring for props
        const { title, author, thumbnail } = this.props;

        // if there is more than one author, join all values in a single string
        const authorStr = author.join(', ');

        return ( 
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${thumbnail})` }}></div>
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
                <div className="book-title">{title}</div>
                <div className="book-authors">{authorStr}</div>
            </div>
        );

    }

}