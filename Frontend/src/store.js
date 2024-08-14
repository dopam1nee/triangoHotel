import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { thunk } from 'redux-thunk'
import {
	appReducer,
	roomReducer,
	roomsReducer,
	userReducer,
	usersReducer,
} from './reducers'

const reducer = combineReducers({
	app: appReducer,
	user: userReducer,
	users: usersReducer,
	room: roomReducer,
	rooms: roomsReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))
