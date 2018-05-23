export default function booksReducer(state = {
	books: [],
	mybooks: [],
	allbooks: []

}, action) {
	switch (action.type) {
		case 'SEARCH_BOOKS':
			{
				return { ...state,
					books: action.payload
				}
			}
		case 'MY_BOOKS':
			{
				return { ...state,
					mybooks: action.payload
				}
			}
		case 'ALL_BOOKS':
			{
				return { ...state,
					allbooks: action.payload
				}
			}
		default:
			return state
	}

}
