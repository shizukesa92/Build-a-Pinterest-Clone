import React, {
	Component
} from 'react'
import {
	connect
} from 'react-redux'
import Paper from 'material-ui/Paper'
import Star from 'material-ui/svg-icons/toggle/star';

import {

} from '../User/UserActions'

class Home extends Component {
	constructor() {
		super()

	}

	render() {

		const style = {
			align: {
				textAlign: 'center'
			},

		}

		return (
			<div className='Home'>


                <div className='row'>
                    <div className='col s4'>
                        
                        <h2><Star color='#ffbf00'/>Catalogue your books online</h2>
                        <h2><Star color='#ffbf00'/>Manage books and requests from your dashboard</h2>
                            
                    </div>
                    <div className='col s4'>
                    
                    <h2><Star color='#ffbf00'/>See all books our users own</h2>
                    <h2><Star color='#ffbf00'/>Request to borrow other users' books</h2>
                        
                </div>

                </div>
            </div>
		)
	}




}

const mapStateToProps = (state) => {
	return {

	}
}
const mapDispatchToProps = (dispatch) => {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
