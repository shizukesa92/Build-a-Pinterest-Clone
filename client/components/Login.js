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
	login
} from '../modules/User/UserActions'

class Login extends Component {
	constructor() {
		super()
		this.state = {
			email: '',
			password: '',
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
			<div>
                
                <div style={style.align}>
                    <h1>Login</h1>

                    <form onSubmit={(e)=>{this.submit(e)}}>
 

                        <TextField hintText="email"
                        name = 'email'
                        onChange={(e)=>{this.handleChange(e)}}
                        value = {this.state.email}
                        errorText={this.state.errors.email||this.props.error.email}
                        
                        /><br />

                        <TextField hintText="password"
                        name='password'
                        type='password'
                        onChange={(e)=>{this.handleChange(e)}}
                        value = {this.state.password}
                        errorText={this.state.errors.password||this.props.error.password}
                        /><br />


                        <RaisedButton type='submit' backgroundColor='#B71C1C' labelColor='#e5e5e5' icon={<Send />} label='send'/>
                    </form>
                </div>
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
				email: this.state.email,
				password: this.state.password,
			}

			this.props.login(data)

		}

	}

	valid() {
		const errors = {}


		if (Validator.isEmpty(this.state.email)) {
			errors.email = 'This field is requierd'
		} else if (!Validator.isEmail(this.state.email)) {
			errors.email = 'Email is invalid'
		}
		if (Validator.isEmpty(this.state.password)) {
			errors.password = 'This field is requierd'
		}


		return errors

	}
}


const mapStateToProps = (state) => {
	return {
		error: state.user.loginError

	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		login: (data) => {
			dispatch(login(data))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
