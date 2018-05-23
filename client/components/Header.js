import React, {
	Component
} from 'react';
import {
	connect
} from 'react-redux'
import {
	Link
} from 'react-router-dom'
import {
	Toolbar,
	ToolbarGroup,
	ToolbarSeparator,
	ToolbarTitle
} from 'material-ui/Toolbar';
import RaisedButton from 'material-ui/RaisedButton'

import {
	logout
} from '../modules/User/UserActions'

class Header extends Component {
	constructor() {
		super()
	}

	render() {
		return (
			<div id="header">
				                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                    <Link to = '/'>Book Trading Club</Link>
                    </ToolbarGroup>
                    <ToolbarGroup lastChild={true}>
                    {this.props.isAuthenticated?
                    (
						<div>
                    <Link to = '/allbooks'>Browse</Link>
                    <Link to = '/mybooks'>{this.props.name}</Link>
                     <h2 onClick={()=>{this.props.logout()}}>Logout</h2>
				 </div>
                    ):
                    (
						<div>
                        <Link to = '/signup'>Sign up</Link>
                        <Link to = '/login'>Login</Link>
					</div>
                    )}
                    </ToolbarGroup>
                </Toolbar>
        </div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.user.isAuthenticated,
		name: state.user.user.name
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => {
			dispatch(logout())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
