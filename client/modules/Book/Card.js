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


export default class Book extends Component{
    constructor(){
        super()
        this.state={
            open:false
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleOpen = this.handleOpen.bind(this)
    }
  

    render(){
        
        const book = this.props.book
        const style ={
            paddingTop:'10px'
        }
        return(
            <div  style={style}className='col s4'>
            <Card>
                <CardMedia>
                    <img src ={book.volumeInfo.imageLinks?(book.volumeInfo.imageLinks.smallThumbnail):(cover)}  height="200"  />
                </CardMedia>
                <CardActions>
                    <FlatButton label='details' onClick={()=>{this.handleOpen()}} />
                    <FlatButton onClick={()=>{
                        const img =book.volumeInfo.imageLinks?(book.volumeInfo.imageLinks.smallThumbnail):(cover)
                        this.props.addBook(book.volumeInfo.title,book.volumeInfo.authors, book.volumeInfo.description,img)}} label='add'/>
                </CardActions>
                <Dialog
          title={book.volumeInfo.title}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        <h2>Author/s</h2>
        <p>{book.volumeInfo.authors}</p>
        <h2>Description</h2>
        <p>{book.volumeInfo.description}</p>
        </Dialog>
            </Card>
        </div>
        )
        
    }
    
  handleOpen(){
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };
}