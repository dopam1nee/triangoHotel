import { useEffect, useState } from 'react'
import { request } from '../../utils/request'
import { ROLE } from '../../constants'
import { useSelector } from 'react-redux'
import { selectUserRole } from '../../selectors'
import { checkAccess } from '../../utils'
import { RoomItem } from './components'
import './room-status.css'

export const RoomStatus = () => {
	const userRole = useSelector(selectUserRole) // роль пользователя

	const [rooms, setRooms] = useState([])

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) return

		request('/rooms').then(({ data }) => {
			setRooms(data)
		})
	}, [userRole]) // проверяем роль пользователя. Если она изменится, доступ закроется

	return (
		<div className="room-status users">
			<h1>Room status</h1>
			<ul className="room-status-list users-list">
				{rooms.map(({ id, number, status }) => (
					<RoomItem key={id} id={id} number={number} status={status} />
				))}
			</ul>
		</div>
	)
}
