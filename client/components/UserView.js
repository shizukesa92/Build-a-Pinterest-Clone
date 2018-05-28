import React, { Component } from 'react';
import Modal from 'react-awesome-modal';

import Pins from './Pins';

import axios from 'axios';

class UserView extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username: '..loading',
			visible: false,
			title: '',
			src: '',
			valid_src: false
		};
	}

	componentDidMount() {

		var _this = this;

		axios.post('/api/get_username', { userID: _this.props.userID })
		.then(function(response) {
			_this.setState({
				username: response.data.username
			});
		});
	}

	updateTitle(event) {
		this.setState({ title: event.target.value });
	}

	updateSrc(event) {
  	this.setState({ src: event.target.value });
	}
	
	onError() {
		//console.log('ONERROR');
		if(this.state.src !== '')
			this.setState({ valid_src: false });
	}

	onLoad() {
		//console.log('ONLOAD');
		this.setState({ valid_src: true });
	}

	savePin() {

		//console.log('SAVE PIN');

		var _this = this;

		if(this.state.title == '')
			this.props.showMessage(false, 'Title required.');

		else if(!this.state.valid_src)
			this.props.showMessage(false, 'Invalid image source.');

		else {
			axios.post('/api/create_pin', {
				title: _this.state.title,
				thumbnail: _this.state.src,
				userID: _this.props.userID,
				username: _this.state.username
			}).then(function(response) {
				if(response.data.success) {
					_this.setState({
						visible: false,
						title: '',
						src: '',
						valid_src: false
					})
					_this.props.updatePins();
				}
				_this.props.showMessage(response.data.success, response.data.message);
			})
		}
	}

	deletePin(event, pinID) {
		
		event.preventDefault();

		if(!confirm('Delete pin?'))
			return;

		//console.log('DELETE PIN');
		//console.log(pinID);

		var _this = this;

		axios.post('/api/delete_pin', {
			pinID: pinID
		}).then(function(response) {
			_this.props.showMessage(response.data.success, response.data.message);
			_this.props.closeModal();
			_this.props.updatePins();
		})

	}

	openModal() {
		this.setState({
			visible: true
		});
	}

	closeModal() {
		this.setState({
			visible: false
		});
	}

	render() {
		//console.log('RENDER USERVIEW');

		var _this = this;

		var userPins = this.props.pins.filter(function(pin) {
			return _this.props.userID == pin.added_by
		});

		var repinnedPins = this.props.pins.filter(function(pin) {
			return pin.repinned_by.indexOf(_this.props.userID) !== -1
		})

		// console.log('USERPINS: ', userPins);
		// console.log('REPINNEDPINS: ', repinnedPins);

		
		return (
			<div className={'userview'}>
				<div className={'pins-username-title'}>{this.state.username}</div>
				{this.props.currentUser?(<button onClick={this.openModal.bind(this)} className={'pin-button new-pin-button'}>NEW PIN</button>):null}

				<div className={'user-pins'} >
					<Pins
						currentUser={this.props.currentUser}
						userPins={userPins?userPins:undefined}
						repinnedPins={repinnedPins?repinnedPins:undefined}
						userID={this.props.userID}
						updatePins={this.props.updatePins.bind(this)}
						showMessage={this.props.showMessage.bind(this)}
						modal_pin={this.props.modal_pin}
						modal_visible={this.props.modal_visible}
						openModal={this.props.openModal.bind(this)}
						closeModal={this.props.closeModal.bind(this)}
						handleClick={this.props.handleClick.bind(this)}
						handleDeletePin={this.deletePin.bind(this)}
						handleLikeClick={this.props.handleLikeClick.bind(this)}
						handleRepinClick={this.props.handleRepinClick.bind(this)}
					/>
				</div>

				<Modal visible={this.state.visible} width={'90%'} effect={'fadeInUp'} onClickAway={() => this.closeModal()}>
					<div className={'modal-container'} >
						<div className={'modal-main-title'}>
							<div className={'modal-main-title-text'}>NEW PIN</div>
							<button className={'modal-close'} onClick={this.closeModal.bind(this)} >X</button>
						</div>
						<div className={'modal-row'} >
							<div className={'modal-title'} >
								Title
							</div>
							<input className={'modal-input'} onChange={this.updateTitle.bind(this)} value={this.state.title} name={'title'} />
						</div>
						<div className={'modal-row'}>
							<div className={'modal-title'} >
								Source
							</div>
							<input className={'modal-input'} onChange={this.updateSrc.bind(this)} value={this.state.src} name={'src'} />
						</div>
						<div className={'modal-image-container'}>
							<img onLoad={this.onLoad.bind(this)} onError={this.onError.bind(this)} src={this.state.src} className={'main-modal-image'} />
						</div>
						<button onClick={this.savePin.bind(this)} className={'pin-button save-pin-button'}>SAVE</button>
					</div>
				</Modal>
			</div>
		);
	}
}

export default UserView;