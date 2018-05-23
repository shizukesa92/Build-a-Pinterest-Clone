import React, {
	Component
} from 'react'
import {
	connect
} from 'react-redux'
import {
	List,
	ListItem
} from 'material-ui/List';


import {
	allbooks,
	trade
} from '../modules/Book/BookActions'
import AllCard from '../modules/Book/AllCard'
import {
	info
} from '../modules/User/UserActions'

class Allbooks extends Component {
	constructor() {
		super()
		this.trade = this.trade.bind(this)
	}

	componentWillMount() {
		this.props.allbooks()
		this.props.info()
	}
	render() {
		const books = this.props.books.map((book) => {
			return <AllCard trade_requests={this.props.trade_requests} trade={this.trade} key={book._id} book ={book}/>
		})
		return (
			<div>
                 <List>
                    <div className='row'>
                    {books}
                    </div>
                </List>
            </div>
		)
	}


	trade(bookid, owner) {
		const info = {
			book: bookid,
			for: owner,
			pending: true
		}
		this.props.trade(info)
	}

}

const mapStateToProps = (state) => {
	return {
		books: state.book.allbooks,
		trade_requests: state.user.trade_requests

	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		allbooks: () => {
			dispatch(allbooks())
		},
		trade: (book) => {
			dispatch(trade(book))
		},
		info: () => {
			dispatch(info())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Allbooks)
