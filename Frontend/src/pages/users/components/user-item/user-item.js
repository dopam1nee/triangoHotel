import { useEffect, useState } from 'react'
import { request } from '../../../../utils/request'
import './user-item.css'

export const UserItem = ({
	id: userId,
	login,
	role: userRole,
	roles,
	registeredAt,
}) => {
	const [initialRole, setInitialRole] = useState(userRole) // начальная роль
	const [selectedRole, setSelectedRole] = useState(userRole) // выбранная роль

	//const dateString = new Date(registeredAt).toLocaleDateString('en-US', {
	//	year: '2-digit',
	//	month: '2-digit',
	//	day: '2-digit',
	//})

	const onRoleSave = (userId, newRole) => {
		request(`/users/${userId}`, 'PATCH', { role: newRole })
	}
	const onRoleChange = ({ target }) => {
		const newRole = Number(target.value)
		setInitialRole(newRole) // обновляем начальную роль на клиенте
		onRoleSave(userId, newRole) // обновляем роль на сервере
	}

	useEffect(() => {
		setSelectedRole(initialRole) // обновляем выбранную роль каждый раз, когда меняется начальная (при изменении на сервере)
	}, [initialRole])

	return (
		<li className="user-item" key={userId}>
			<h4 className="user-item-login">{login}</h4>
			<h4 className="user-item-registeredAt">{registeredAt}</h4>
			<h4 className="user-item-role">
				<select className="select" value={selectedRole} onChange={onRoleChange}>
					{roles.map(({ id: roleId, name: roleName }) => (
						<option
							className="option"
							key={roleId}
							value={roleId}
							disabled={roleId === userRole}
						>
							{roleName}
						</option>
					))}
				</select>
			</h4>
		</li>
	)
}
