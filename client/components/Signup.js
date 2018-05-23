import React, {
	Component
} from 'react'
import {
	connect
} from 'react-redux'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton'
import Send from 'material-ui/svg-icons/content/send';
import Validator from 'validator'
import isEmpty from 'lodash/isEmpty';

import {
	signup
} from '../modules/User/UserActions'

class Signup extends Component {
	constructor() {
		super()
		this.state = {
			name: '',
			email: '',
			password: '',
			repeatedPassword: '',
			errors: {}
		}
		this.handleChange = this.handleChange.bind(this)
		this.submit = this.submit.bind(this)
		this.valid = this.valid.bind(this)
	}


	render() {

		const style = {
			align: {
				textAlign: 'center'
			}
		}

		return (

			<div style={style.align}>
                    <h1>Sign up</h1>

                    <form onSubmit={(e)=>{this.submit(e)}}>
                        <TextField hintText="name"
                        name = 'name'
                        onChange={(e)=>{this.handleChange(e)}}
                        value = {this.state.name}
                        errorText={this.state.errors.name}
                        /><br />

                        <TextField hintText="email"
                        name = 'email'
                        onChange={(e)=>{this.handleChange(e)}}
                        value = {this.state.email}
                        errorText={this.state.errors.email||this.props.error}
                        
                        /><br />

                        <TextField hintText="password"
                        name='password'
                        type='password'
                        onChange={(e)=>{this.handleChange(e)}}
                        value = {this.state.password}
                        errorText={this.state.errors.password}
                        /><br />

                        <TextField hintText="repeat password"
                        name='repeatedPassword'
                        type='password'
                        onChange={(e)=>{this.handleChange(e)}}
                        value = {this.state.repeatedPassword}
                        errorText={this.state.errors.repeatedPassword}
                        /><br />

                        <RaisedButton type='submit' backgroundColor='#B71C1C' labelColor='#e5e5e5' icon={<Send />} label='send'/>
                    </form>
                </div>
		)
	}
	handleChange(e) {
		const value = e.target.value
		this.setState({
			[e.target.name]: value
		})
	}

	submit(e) {
		e.preventDefault()

		const errors = this.valid()
		this.setState({
			errors: errors
		})

		if (isEmpty(errors)) {
			const data = {
				name: this.state.name,
				email: this.state.email,
				password: this.state.password,
			}
			this.props.signup(data)

		}

	}

	valid() {
		const errors = {}
		if (Validator.isEmpty(this.state.name)) {
			errors.name = 'This field is required'
		}

		if (Validator.isEmpty(this.state.email)) {
			errors.email = 'This field is required'
		} else if (!Validator.isEmail(this.state.email)) {
			errors.email = 'Email is invalid'
		}
		if (Validator.isEmpty(this.state.password)) {
			errors.password = 'This field is requierd'
		}
		if (Validator.isEmpty(this.state.repeatedPassword)) {
			errors.repeatedPassword = 'This field is requiered'
		} else if (!Validator.equals(this.state.password, this.state.repeatedPassword)) {
			errors.repeatedPassword = 'Passwords must match'
		}

		return errors

	}
}


const mapStateToProps = (state) => {
	return {
		error: state.user.signupError

	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		signup: (data) => {
			dispatch(signup(data))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
