import React, {
	Component
} from 'react'
import {
	Card,
	CardActions,
	CardHeader,
	CardMedia,
	CardTitle,
	CardText
} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog';




export default class BookTemplate extends Component {
	constructor() {
		super()
		this.state = {
			open: false
		}
		this.handleClose = this.handleClose.bind(this)
		this.handleOpen = this.handleOpen.bind(this)
	}
	render() {
		const book = this.props.book
		const style = {
			paddingTop: '10px'
		}

		const trading = this.props.trade_requests.map((request) => {
			return request.book._id
		})
		const isin = trading.includes(book._id)

		return (

			<div  className='col s4'>
                <Card>
                    <CardMedia>
                        <img src ={book.image} height="200"  />
                    </CardMedia>
                    <CardActions>
                        <FlatButton label='details' onClick={()=>{this.handleOpen()}} />
                        <FlatButton label='trade request' disabled={isin} onClick={()=>{this.props.trade(book._id,book.book_owner._id)}} />
                        </CardActions>
                    <Dialog
                    title={book.title}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    >
                    <span><h3><b>book owner:</b> {book.book_owner.name}</h3></span>
                    <span><h3><b>contact:</b> {book.book_owner.email}</h3></span>

                    <h2>Author/s</h2>
                    <p>{book.authors}</p>
                    <h2>Description</h2>
                    <p>{book.description}</p>
                    </Dialog>
                </Card>
        </div>

		)
	}
	handleOpen() {
		this.setState({
			open: true
		});
	};

	handleClose() {
		this.setState({
			open: false
		});
	};
}
