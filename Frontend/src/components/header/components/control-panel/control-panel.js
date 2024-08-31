import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserRole } from '../../../../selectors'
import { ROLE } from '../../../../constants'
import { logout } from '../../../../actions'
import './control-panel.css'

export const ControlPanel = () => {
	const dispatch = useDispatch()

	const role = useSelector(selectUserRole)

	const onLogout = () => {
		dispatch(logout())
		sessionStorage.removeItem('userData')
	}

	return (
		<div className="header-control-panel">
			{role === ROLE.GUEST ? (
				<>
					<Link to="/login" className="header-link-log-in control-panel-link link">
						Log in
					</Link>
					<Link
						to="/register"
						className="header-link-sign-up control-panel-link link"
					>
						Sign up
					</Link>
				</>
			) : (
				<button
					className="header-link-log-out control-panel-link link"
					onClick={onLogout}
				>
					Log out
				</button>
			)}
		</div>
	)
}
