import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import Masonry from 'react-masonry-component';
import Modal from 'react-awesome-modal';
import axios from 'axios';

class Pins extends Component {

	render() {

		//console.log('RENDER PINS');
		// console.log(this.props.pins);
		// console.log(this.props.userPins);
		// console.log(this.props.repinnedPins);

		var _this = this;
		var pins = [];
		var userPins = [];
		var repinnedPins = [];

		if(this.props.pins) {
			pins = this.props.pins.map(function(pin) {
				return (
					<div className={'grid-item grid-item-width-1'} key={pin._id} onClick={_this.props.handleClick.bind(_this, event, pin)}>
						<img className={'pin'} title={pin.title} src={pin.thumbnail} />
					</div>
				)
			});
		} 

		if(this.props.userPins) {
			userPins = this.props.userPins.map(function(pin) {
				return (
					<div className={'grid-item grid-item-width-1'} key={pin._id} onClick={_this.props.handleClick.bind(_this, event, pin)}>
						<img className={'pin'} title={pin.title} src={pin.thumbnail} />
					</div>
				)
			});
		}

		if(this.props.repinnedPins) {
			repinnedPins = this.props.repinnedPins.map(function(pin) {
				return (
					<div className={'grid-item grid-item-width-1'} key={pin._id} onClick={_this.props.handleClick.bind(_this, event, pin)}>
						<img className={'pin'} title={pin.title} src={pin.thumbnail} />
					</div>
				)
			});
		}

		var liked = '';
		var shared = '';

		if(this.props.modal_pin.liked_by && this.props.modal_pin.liked_by.indexOf(this.props.userID) !== -1) {
			liked = ' liked';
		}

		if(this.props.modal_pin.repinned_by && this.props.modal_pin.repinned_by.indexOf(this.props.userID) !== -1) {
			shared = ' shared';
		}

		var delete_pin = '';

		if(this.props.handleDeletePin && this.props.currentUser && this.props.modal_pin.added_by == this.props.userID) {
			delete_pin = (
				<i className={('fa fa-trash trash icon' + focus + shared)} onClick={this.props.handleDeletePin.bind(this, event, this.props.modal_pin._id)} title={'delete'} />
			)
		}

		return (
			<div>
				{pins.length>0?(<div>
					<div className={'pins-title'}>ALL PINS</div>
					<Masonry
						className={'grid'} // default ''
						disableImagesLoaded={false} // default false 
						updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false 
					>
						{pins}
					</Masonry></div>)
				:''}
				
				{userPins.length>0?(<div>
					<div className={'pins-title'}>PINS</div>
					<Masonry
						className={'grid'} // default ''
						disableImagesLoaded={false} // default false 
						updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false 
					>
						{userPins}
					</Masonry></div>)
				:''}
				
				{repinnedPins.length>0?(<div>
					<div className={'pins-title'}>REPINS</div>
					<Masonry
						className={'grid'} // default ''
						disableImagesLoaded={false} // default false 
						updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false 
					>
						{repinnedPins}
					</Masonry></div>)
				:''}

				<Modal visible={this.props.modal_visible} width={'90%'} height={'90%'} effect={'fadeInUp'} onClickAway={() => this.props.closeModal()}>
					<div className={'modal-container'} >
						<div className={'modal-main-title'}>
							<div className={'modal-main-title-text'}>{this.props.modal_pin?this.props.modal_pin.title:''}</div>
							<button className={'modal-close'} onClick={this.props.closeModal.bind(this)} >X</button>
						</div>
						<div className={'social-bar'}>
							<div style={{'flex':'1'}}>
								<Link onClick={this.props.closeModal} to={'/user/' + this.props.modal_pin.added_by} className={'link'}>{this.props.modal_pin.username?this.props.modal_pin.username:'Unknown'}</Link>
							</div>
							<i className={('fa fa-heart heart icon' + focus + liked)} onClick={this.props.handleLikeClick.bind(this, event, this.props.modal_pin._id)} title={'like'} >{this.props.modal_pin.num_likes}</i>
							<i className={('fa fa-refresh share icon' + focus + shared)} onClick={this.props.handleRepinClick.bind(this, event, this.props.modal_pin._id)} title={'repin'} >{this.props.modal_pin.num_repins}</i>
							{delete_pin}
						</div>
						<div className={'modal-image-container'}>
							<img src={this.props.modal_pin?this.props.modal_pin.thumbnail:''} className={'main-modal-image'} />
						</div>
					</div>
				</Modal>

			</div>
		);
	}
}

export default Pins;