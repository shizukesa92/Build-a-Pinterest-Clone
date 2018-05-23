import axios from 'axios'
import jwtDecode from 'jwt-decode'


export function signup(data) {

	return dispatch => {
		axios({
			method: 'post',
			url: '/signup',
			data: data
		}).then((res) => {
			if (!res.data.error) {
				localStorage.setItem('token', res.data)
				const token = localStorage.token
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
			}

			dispatch({
				type: 'SIGNUP',
				payload: res.data
			})
		})
	}
}

export function logout() {

	return dispatch => {
		localStorage.removeItem('token')
		delete axios.defaults.headers.common['Authorization'];
		dispatch({
			type: 'LOGOUT'
		})
	}
}
export function login(data) {
	return dispatch => {
		axios({
			method: 'post',
			url: 'login',
			data: data
		}).then((res) => {
			console.log(res)
			if (!res.data.email && !res.data.password) {
				localStorage.setItem('token', res.data)
				const token = localStorage.token
				axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
			}
			dispatch({
				type: 'LOGIN',
				payload: res.data
			})
		})
	}
}

export function setCurrentUser(token) {
	return {
		type: 'SET_CURRENT_USER',
		payload: token
	}
}

export function handleChange(profile) {
	return dispatch => {
		dispatch({
			type: 'HANDLE_CHANGE',
			payload: profile
		})
	}
}
export function info() {
	return dispatch => {
		axios({
			method: 'get',
			url: '/info'
		}).then((res) => {
			console.log(res.data)
			dispatch({
				type: 'USER_INFO',
				payload: res.data
			})
		})
	}
}
export function deleteRequest(request) {
	return dispatch => {
		axios({
			method: 'post',
			url: '/deleterequest',
			data: request
		}).then((res) => {
			dispatch({
				type: 'USER_INFO',
				payload: res.data
			})
		})
	}
}
