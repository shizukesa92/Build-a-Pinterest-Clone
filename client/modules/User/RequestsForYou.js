import React,{Component} from 'react'
import {List, ListItem} from 'material-ui/List';

import RequestsForYouCard from './RequestsForYouCard'

export default class RequestsForYou extends Component{
  
    render(){
       const requests = this.props.user_info.map((request)=>{
           return <RequestsForYouCard accept={this.props.accept} key={request._id} info={request}/>
       })
        return(
            <div>
                <List>
                    <div className='row'>
                   {requests}
                    </div>
                </List>
            </div>
        )
    }
}