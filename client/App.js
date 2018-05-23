import React, {
	Component
} from "react";
import ReactDOM from "react-dom";
import {
	BrowserRouter,
	Route,
	Switch,
	Redirect
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
	connect
} from 'react-redux'
import Routes from "./routes"
import Home from './modules/App/App';
import Signup from './components/Signup'
import Login from './components/Login'
import Mybooks from './components/Mybooks'
require("./main.scss");
require("./components/Components.scss");
require("./modules/App/App.scss")

class App extends Component {

	render() {
		return (
			<BrowserRouter>
			<div id = "wrapper">
            <Header />
			<div id ="content">
<Switch>
                    <Route exact path='/' component={Home}/>
					<Route exact path='/allbooks' component={Home}/>
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
	<Footer />
</div>
			</BrowserRouter>
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

export default connect(mapStateToProps, mapDispatchToProps)(App)
