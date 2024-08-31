import React, { useLayoutEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Header } from './components'
import { Login, Main, Register, Users, RoomStatus, MyRooms, AddRoom } from './pages'
import { useDispatch } from 'react-redux'
import { setUser } from './actions'
import './app.css'

export const App = () => {
	const dispatch = useDispatch()

	useLayoutEffect(() => {
		const currentUserDataJSON = sessionStorage.getItem('userData') // получили строку

		if (!currentUserDataJSON) return // если пользователя нет (не авторизован), то ничего не делаем

		const currentUserData = JSON.parse(currentUserDataJSON) // преобразовали в JSON объект

		dispatch(
			setUser({
				...currentUserData,
				role: Number(currentUserData.role), // важно, чтобы значение role было числом, а не строкой, в которую преобразует sessionStorage (метод браузера), потому что роли на сервере и клиенте обозначены числами
			}),
		)
	}, [dispatch]) // отличие от useEffect в том, что useEffect вызывается только после отрисовки разметки, а useLayoutEffect вызывается до отрисовки, то есть выполняет действие до рендера страницы

	return (
		<div className="app">
			<Header />
			<div className="container">
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/users" element={<Users />} />
					<Route path="/room-status" element={<RoomStatus />} />
					<Route path="/my-rooms" element={<MyRooms />} />
					<Route path="/add-room" element={<AddRoom />} />
				</Routes>
			</div>
		</div>
	)
}
