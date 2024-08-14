import { useEffect, useState } from 'react'
import { request } from '../../utils/request'
import { ROLE, ROLE_STRING } from '../../constants'
import { useSelector } from 'react-redux'
import { selectUserRole } from '../../selectors'
import { checkAccess } from '../../utils'
import { UserItem } from './components'
import './users.css'

export const Users = () => {
	const userRole = useSelector(selectUserRole) // роль пользователя

	const [users, setUsers] = useState([])

	const roles = [
		{ id: ROLE.ADMIN, name: ROLE_STRING[ROLE.ADMIN] },
		{ id: ROLE.MODERATOR, name: ROLE_STRING[ROLE.MODERATOR] },
		{ id: ROLE.USER, name: ROLE_STRING[ROLE.USER] },
	]

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) return

		request('/users').then(({ data }) => {
			setUsers(data)
		})
	}, [userRole]) // проверяем роль пользователя. Если она изменится, доступ закроется

	return (
		<div className="users">
			<h1>Users</h1>
			<ul className="users-list">
				{users.map(({ id, login, role, registeredAt }) => (
					<UserItem
						key={id}
						id={id}
						login={login}
						role={role}
						roles={roles}
						registeredAt={registeredAt}
					/>
				))}
			</ul>
		</div>
	)
}
