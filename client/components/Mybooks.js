import React, {
	Component
} from 'react'
import {
	connect
} from 'react-redux'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import {
	List,
	ListItem
} from 'material-ui/List';
import {
	search,
	mybooks,
	addBook,
	deleteBook,
	accept
} from '../modules/Book/BookActions'
import {
	Tabs,
	Tab
} from 'material-ui-scrollable-tabs/Tabs';
import Slider from 'material-ui/Slider';
import {
	info,
	deleteRequest
} from '../modules/User/UserActions'


import Card from '../modules/Book/Card'
import Books from '../modules/Book/Books'
import MyRequests from '../modules/User/MyRequests'
import RequestsForYou from '../modules/User/RequestsForYou'

class Mybooks extends Component {
	constructor() {
		super()
		this.state = {
			book: ''
		}
		this.handleChange = this.handleChange.bind(this)
		this.search = this.search.bind(this)
		this.mybooks = this.mybooks.bind(this)
		this.addBook = this.addBook.bind(this)
		this.deleteBook = this.deleteBook.bind(this)
		this.userInfo = this.userInfo.bind(this)
		this.deleteRequest = this.deleteRequest.bind(this)
		this.accept = this.accept.bind(this)
	}
	componentWillMount() {
		this.props.info()
	}


	render() {
		const books = this.props.books.map((book) => {
			return (
				<Card key={book.id} addBook={this.addBook} book ={book}/>
			)
		})

		const style = {
			display: 'flex',
			border: {
				borderRight: '1px solid black'
			},
			color: {
				color: 'black'
			}
		}
		return (
			<Tabs style={style.color} tabType={'scrollable-buttons'} className='row'>
                <Tab label={<span style={{ color: 'black' }}>add book</span>}>
                    <div>
                        <h2>add book</h2>
                        <TextField 
                        name='book'
                        hintText='search'
                        value={this.state.book}
                        onChange={(e)=>{this.handleChange(e)}}
                        />
                        <RaisedButton onClick={()=>{this.search()}} label='search'
                        />
                        <List >
                            <div className='row'>
                            {books}
                            </div>
                        </List>

                    </div>
                </Tab>
                <Tab 		label={<span style={{ color: 'black' }}>My books</span>}> 
                    <div>
                        <h2>my books</h2>
                        <Books mybooks = {this.mybooks} books={this.props.ownbooks} deleteBook = {this.deleteBook} />

                    </div>
                </Tab>
                <Tab 		label={<span style={{ color: 'black' }}>Your trade requests</span>}> 
                    <div>
                        <h2>your trade requests</h2>
                        <MyRequests  info={this.userInfo} user_info = {this.props.trade_requests} deleteRequest={this.deleteRequest} />
                    </div>
                </Tab>
                <Tab 		label={<span style={{ color: 'black' }}>Trade requests for you</span>}> 
                    <div>
                        <h2>trade requests for you</h2>
                        <RequestsForYou accept={this.accept} user_info = {this.props.requests_for_you}  />

                    </div>
                </Tab>

            </Tabs>


		)
	}
	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	search() {
		const book = {
			book: this.state.book
		}
		this.props.search(book)
	}
	mybooks() {
		this.props.mybooks()
	}
	addBook(title, authors, description, img) {
		const book = {
			title: title,
			authors: authors,
			description: description,
			image: img
		}
		this.props.addBook(book)
	}
	deleteBook(id) {
		const book = {
			id: id
		}
		this.props.deleteBook(book)
	}
	userInfo() {
		this.props.info()
	}
	deleteRequest(id, bookid, userid) {
		const request = {
			bookid: bookid,
			userid: userid,
			id: id
		}
		this.props.deleteRequest(request)
	}
	accept(id, userid, bookid, reqid) {
		const book = {
			userid: userid,
			id: id,
			bookid: bookid,
			reqid: reqid
		}
		this.props.accept(book)

	}



}

const mapStateToProps = (state) => {
	return {
		books: state.book.books,
		ownbooks: state.book.mybooks,
		trade_requests: state.user.trade_requests,
		requests_for_you: state.user.requests_for_you

	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		search: (book) => {
			dispatch(search(book))
		},
		mybooks: () => {
			dispatch(mybooks())
		},
		addBook: (book) => {
			dispatch(addBook(book))
		},
		deleteBook: (id) => {
			dispatch(deleteBook(id))
		},
		info: () => {
			dispatch(info())
		},
		deleteRequest: (request) => {
			dispatch(deleteRequest(request))
		},
		accept: (book) => {
			dispatch(accept(book))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mybooks)
