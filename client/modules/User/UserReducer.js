import jwtDecode from 'jwt-decode'



export default function userReducer(state = {
	isFetching: false,
	isAuthenticated: false,
	signupError: '',
	loginError: {},
	user: {},
	user_info: [],
	requests_for_you: [],
	trade_requests: []
}, action) {
	switch (action.type) {
		case 'LOGIN':
			{
				if (action.payload.email || action.payload.password) {
					return { ...state,
						loginError: action.payload,
						isAuthenticated: false
					}
				} else {
					return { ...state,
						loginError: {},
						isAuthenticated: true,
						user: jwtDecode(action.payload)
					}
				}
			}
		case 'SIGNUP':
			{
				if (action.payload.error) {
					return { ...state,
						signupError: action.payload.error,
						isAuthenticated: false
					}
				} else {
					return { ...state,
						signupError: '',
						isAuthenticated: true,
						user: jwtDecode(action.payload)
					}
				}

			}
		case 'LOGOUT':
			{
				return { ...state,
					isAuthenticated: false,
					error: '',
					user: {}
				}
			}
		case 'SET_CURRENT_USER':
			{
				return {
					...state,
					isAuthenticated: true,
					user: jwtDecode(action.payload)
				}
			}
		case 'UPDATE':
			{
				return { ...state,
					user: jwtDecode(action.payload)
				}
			}
		case 'HANDLE_CHANGE':
			{
				return { ...state,
					user: { ...state.user,
						name: action.payload.name,
						city: action.payload.city,
						state: action.payload.state
					}
				}
			}
		case 'USER_INFO':
			{
				return { ...state,
					user_info: action.payload,
					trade_requests: action.payload.trade_requests,
					requests_for_you: action.payload.requests_for_you
				}
			}
		default:
			return state
	}

}
