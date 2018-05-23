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


export default class MyRequestsCard extends Component {
	constructor() {
		super()
		this.state = {
			open: false
		}
		this.handleClose = this.handleClose.bind(this)
		this.handleOpen = this.handleOpen.bind(this)
	}
	render() {
		const info = this.props.info
		const style = {
			paddingTop: '10px'
		}
		console.log(this.props.info)
		return (

			<div  className='col s4'>
                
                <Card>
                    <CardMedia>
                        <img src ={info.book.image} height="200"  />
                    </CardMedia>
                    <CardActions>
                        <FlatButton label='details' onClick={()=>{this.handleOpen()}} />{info.accepted?(<p>accepted</p>):(<p>pending</p>)}
                        <FlatButton label='delete request' onClick={()=>{this.props.deleteRequest(info._id, info.book._id, info.for._id)}} />
                        </CardActions>
                    <Dialog
                    title={info.book.title}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    >
                    <span><h3><b>book owner:</b> {info.for.name}</h3></span>
                    <span><h3><b>contact:</b> {info.for.email}</h3></span>

                    <h2>Author/s</h2>
                    <p>{info.book.authors}</p>
                    <h2>Description</h2>
                    <p>{info.book.description}</p>
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
