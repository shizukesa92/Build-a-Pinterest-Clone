import React,{Component} from 'react'
import {List, ListItem} from 'material-ui/List';

import MyRequestsCard from './MyRequestsCard'

export default class MyRequests extends Component{
    componentWillMount(){
        this.props.info()
    }
    render(){
       const requests = this.props.user_info.map((request)=>{
           return <MyRequestsCard deleteRequest={this.props.deleteRequest} key={request._id} info={request}/>
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