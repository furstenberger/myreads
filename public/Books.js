import React, { Component } from 'react';



class Book extends Component {
    
    static propTypes = {
        title: PropTypes.string.isRequired,
        author: PropTypes.array.isRequired,
        thumbnail: PropTypes.string.isRequired
    }
    
    state = {
        shelf: ''
    }
    
    render () {

        const { title, author, thumbnail } = this.props;

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
                <div className="book-authors">J.R.R. Tolkien</div>
            </div>
        )

    }

}