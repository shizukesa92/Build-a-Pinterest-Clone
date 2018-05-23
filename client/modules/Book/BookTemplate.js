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
		const book = this.props.info
		const style = {
			paddingTop: '10px'
		}
		return (

			<div  className='col s4'>
                <Card>
                    <CardMedia>
                        <img src ={book.image} height="200"  />
                    </CardMedia>
                    <CardActions>
                        <FlatButton label='details' onClick={()=>{this.handleOpen()}} />
                        <FlatButton label='delete' onClick={()=>{this.props.deleteBook(book._id)}} />
                        </CardActions>
                    <Dialog
                    title={book.title}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    >
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
