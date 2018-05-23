import React, {Component} from 'react'
import {List, ListItem} from 'material-ui/List';

import BookTemplate from './BookTemplate'
export default class Books extends Component{
    componentWillMount(){
       this.props.mybooks()
    }
    render(){
        
        const books = this.props.books.map((book)=>{
            return <BookTemplate key={book._id} deleteBook = {this.props.deleteBook} info={book}/>
        })
        return(
            <div>
                <List>
                    <div className='row'>
                    {books}
                    </div>
                </List>
            </div>
        )
    }
}