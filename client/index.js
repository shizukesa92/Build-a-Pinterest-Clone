import React from 'react';
import ReactDOM from 'react-dom';
import {
	Provider
} from 'react-redux';
import reduxThunk from 'redux-thunk';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {
	setCurrentUser
} from './modules/User/UserActions'
import axios from 'axios'
import App from './App';
import {
	store
} from './store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'


if (localStorage.token) {
	const token = localStorage.token
	axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
	store.dispatch(setCurrentUser(token))
} else {
	delete axios.defaults.headers.common['Authorization'];
}

const muiTheme = getMuiTheme({
	tabs: {
		backgroundColor: 'white',
		textColor: 'black',
		selectedTextColor: 'black'
	}
})

ReactDOM.render(
	<MuiThemeProvider muiTheme={muiTheme} >
    <Provider store={store}>
        <App />
    </Provider>
</MuiThemeProvider>,
	document.getElementById("root")
)
