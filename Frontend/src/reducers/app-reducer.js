import { ACTION_TYPE } from '../actions'

const initialAppState = {
	wasLogout: false,
	modal: {
		isOpen: false,
		text: '',
		onConfirm: () => {},
		onCancel: () => {},
	},
	bookCard: {
		isOpen: false,
		onCancel: () => {},
	},
}

export const appReducer = (state = initialAppState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.LOGOUT:
			return {
				...state,
				wasLogout: !state.wasLogout,
			}
		case ACTION_TYPE.OPEN_MODAL:
			return {
				...state,
				modal: {
					...state.modal,
					...payload,
					isOpen: true,
				},
			}
		case ACTION_TYPE.CLOSE_MODAL:
			return initialAppState
		case ACTION_TYPE.OPEN_BOOK_CARD:
			return {
				...state,
				bookCard: {
					...state.bookCard,
					isOpen: true,
				},
			}
		case ACTION_TYPE.CLOSE_BOOK_CARD:
			return initialAppState
		default:
			return state
	}
}
