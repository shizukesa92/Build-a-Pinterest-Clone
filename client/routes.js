import React from "react";
import {
	Route,
	Switch,
	Redirect
} from "react-router-dom";
import {
	connect
} from 'react-redux'
import Home from './modules/App/App';

import Signup from './components/Signup'
import Login from './components/Login'
import Mybooks from './components/Mybooks'

class Routes extends React.Component {

	render() {
		return (

			<div id ="content">
<Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/allbooks' render={() => (

                        this.props.isAuthenticated ? (
                            <Allbooks />
                        ) : (
                            <Redirect to="/"/>
                            
                        )
                        )}/>
                    <Route exact path='/signup' render={() => (

                        this.props.isAuthenticated ? (
                            <Redirect to="/"/>
                        ) : (
                            <Signup/>
                        )
                        )}/>
                        <Route exact path='/login' render={() => (

                        this.props.isAuthenticated ? (
                            <Redirect to="/"/>
                        ) : (
                            <Login/>
                        )
                        )}/>
                                        <Route exact path='/mybooks' render={() => (

                        this.props.isAuthenticated ? (
                            <Mybooks />
                        ) : (
                            <Redirect to="/"/>
                            
                        )
					)}/>                    
			</Switch>
			</div>


		);

	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.user.isAuthenticated
	}
}
const mapDispatchToProps = (dispatch) => {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
