import { useSelector } from 'react-redux'
import { selectUserRole } from '../../../../selectors'
import { ROLE } from '../../../../constants'
import { Link, useLocation } from 'react-router-dom'
import './menu.css'

export const Menu = () => {
	const role = useSelector(selectUserRole)
	const location = useLocation()

	const routes = [
		{ path: '/add-room', label: 'Add room', show: role === ROLE.ADMIN },
		{ path: '/room-status', label: 'Room status', show: role === ROLE.ADMIN },
		{ path: '/users', label: 'Users', show: role === ROLE.ADMIN },
		{ path: '/my-rooms', label: 'My rooms', show: role !== ROLE.GUEST },
		{ path: '/', label: 'Home', show: role !== ROLE.GUEST },
	]

	return (
		<nav className="header-menu">
			<ul className="header-menu-list">
				{routes.map(
					(route, index) =>
						route.show && (
							<li key={index} className="header-menu-item">
								<Link
									to={route.path}
									className={`header-menu-link link ${
										location.pathname === route.path ? 'is-current' : ''
									}`}
								>
									{route.label}
								</Link>
							</li>
						),
				)}
			</ul>
		</nav>
	)
}
