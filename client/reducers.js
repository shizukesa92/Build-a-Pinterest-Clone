import {
	combineReducers
} from 'redux'
import user from './modules/User/UserReducer'
import book from './modules/Book/BookReducer'

export default combineReducers({
	user,
	book
})
