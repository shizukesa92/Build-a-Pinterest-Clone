import React, {
	Component,
	PropTypes
} from 'react';

import {
	BrowserRouter,
	Redirect,
	Route,
	Switch,
	Link
} from 'react-router-dom';
import {
	slide as Menu
} from 'react-burger-menu';
import Radium from 'radium';

let RadiumLink = Radium(Link);

import Header from './Header';
import Pins from './Pins';
import UserView from './UserView';

import axios from 'axios';
require("./main.scss");
require("./components/Components.scss");
require("./modules/App/App.scss")
var isOpen = false;

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: undefined,
			userID: undefined,
			pins: [],
			modal_visible: false,
			modal_pin: ''
		};
	}

	componentDidMount() {

		//console.log('COMPONENT DID MOUNT');

		var _this = this;

		this.updatePins();

		this.updateUser();

	}

	showMessage(success, message) {
		var msg_cntr = document.getElementById('message-container');
		msg_cntr.classList = 'message-container show-container';

		var msg = document.getElementById('message');
		msg.innerHTML = message;
		if (success)
			msg.classList = 'message show';
		else
			msg.classList = 'message show error';

		if (window.message_timeout)
			clearTimeout(window.message_timeout);

		window.message_timeout = setTimeout(function() {
			msg.classList = 'message';
			msg_cntr.classList = 'message-container';
		}, 3000);
	}

	updatePins(pin) {

		//console.log('IN UPDATE PINS');

		var _this = this;

		//if a pin has been updated, by liking or repinning
		//find it and update it and rerender
		if (pin) {
			var tempPins = this.state.pins.slice();
			tempPins.map(function(mapPin) {
				if (mapPin._id == pin._id) {
					//console.log(mapPin, pin);
					mapPin.liked_by = pin.liked_by;
					mapPin.num_likes = pin.num_likes;
					mapPin.repinned_by = pin.repinned_by;
					mapPin.num_repins = pin.num_repins;
				}
				return mapPin;
			})
			//console.log(tempPins);
			this.setState({
				pins: tempPins
			});
			return;
		}


		axios.get('../api/get_all_pins')
			.then(function(response) {
				//console.log('UPDATE PINS RESPONSE:');
				//console.log(response.data);

				_this.setState({
					pins: response.data.pins
				});
			});
	}

	updateUser() {

		//console.log('IN UPDATE USER');

		var _this = this;

		axios.get('/api/get_user_info')
			.then(function(response) {
				//console.log('UPDATE USER RESPONSE:');
				//console.log(response.data);

				if (!response.data.logged_in) {
					_this.setState({
						username: undefined,
						userID: undefined
					});
				} else if (response.data.logged_in) {
					_this.setState({
						username: response.data.username,
						userID: response.data.userID
					});
				}

			});

	}

	closeMenu(type) {

		var _this = this;

		if (type == 'login')
			window.location.href = '/auth/google';

		if (type == 'logout') {
			axios.get('/logout')
				.then(function(err, response) {
					_this.updateUser();
				});
		}

		isOpen = false;
	}

	openModal(pin) {
		this.setState({
			modal_visible: true,
			modal_pin: pin
		});
	}

	closeModal() {
		this.setState({
			modal_visible: false
		});
	}

	handleClick(event, pin) {
		event.preventDefault();

		//console.log('TOGGLE', event);

		this.openModal(pin);

		if (event.cancelBubble) {
			event.cancelBubble = false;
			return;
		}
	}

	handleLikeClick(event, pinID) {
		event.preventDefault();

		//console.log('LIKE', event);

		var _this = this;

		event.cancelBubble = true;

		if (!this.state.userID) {
			//console.log('LOGIN?');
			window.location.href = '/auth/google';
			return;
		}

		axios.post('/api/like_pin', {
			pinID: pinID,
			userID: _this.state.userID
		}).then(function(response) {
			_this.showMessage(response.data.success, response.data.message);
			_this.updatePins(response.data.pin);
		});
	}

	handleRepinClick(event, pinID) {
		event.preventDefault();

		//console.log('REPIN', event);

		var _this = this;

		event.cancelBubble = true;

		if (!this.state.userID) {
			//console.log('LOGIN?');
			window.location.href = '/auth/google';
			return;
		}

		axios.post('/api/repin_pin', {
			pinID: pinID,
			userID: _this.state.userID
		}).then(function(response) {
			_this.showMessage(response.data.success, response.data.message);
			_this.updatePins(response.data.pin);
		});
	}

	render() {

		return (
			<BrowserRouter>
				<div id={'app'} className={'app'}>
					<Route path='/' component={() => (
						<Menu isOpen={isOpen} pageWrapId={'page-wrap'} outerContainerId={'app'} customBurgerIcon={<img src='https://upload.wikimedia.org/wikipedia/commons/2/27/Menu%2C_Web_Fundamentals_%28White%29.svg' />} customCrossIcon={ false } >
							<RadiumLink onClick={this.closeMenu.bind(this)} className='menu-item' to='/'>Home</RadiumLink>
							{(this.state.username
								?<RadiumLink onClick={this.closeMenu.bind(this)} className='menu-item' to={('/user/'+this.state.userID)}>{this.state.username}</RadiumLink>
								: (<RadiumLink onClick={this.closeMenu.bind(this, 'login')} className='menu-item' to='/'>Login</RadiumLink>)
							)}
							{(this.state.username
								?<RadiumLink onClick={this.closeMenu.bind(this, 'logout')} className='menu-item' to='/'>Logout</RadiumLink>
								: ''
							)}
							
						</Menu>)}
					/>
					<div id={'page-wrap'}>
						<Header />
						<Switch>
							<Route exact path='/' component={() => 
								<Pins 
									userID={this.state.userID}
									username={this.state.username}
									pins={this.state.pins}
									updatePins={this.updatePins.bind(this)}
									showMessage={this.showMessage.bind(this)}
									modal_pin={this.state.modal_pin}
									modal_visible={this.state.modal_visible}
									openModal={this.openModal.bind(this)}
									closeModal={this.closeModal.bind(this)}
									handleClick={this.handleClick.bind(this)}
									handleLikeClick={this.handleLikeClick.bind(this)}
									handleRepinClick={this.handleRepinClick.bind(this)}
								/>
							} />
							<Route path='/user/:userID' component={
								({ match }) => (
									<UserView 
										currentUser={this.state.userID == match.params.userID}
										userID={match.params.userID}
										pins={this.state.pins}
										updatePins={this.updatePins.bind(this)}
										showMessage={this.showMessage.bind(this)}
										modal_pin={this.state.modal_pin}
										modal_visible={this.state.modal_visible}
										openModal={this.openModal.bind(this)}
										closeModal={this.closeModal.bind(this)}
										handleClick={this.handleClick.bind(this)}
										handleLikeClick={this.handleLikeClick.bind(this)}
										handleRepinClick={this.handleRepinClick.bind(this)}
										/> )
								} />
							<Route path='/login' component={() => <LoginView />} />
							<Route path='/logout' component={() => <LogoutView />} />
						</Switch>
					</div>

				</div>
			</BrowserRouter>
		);
	}
}

export default App;
