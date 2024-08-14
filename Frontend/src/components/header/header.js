import { ControlPanel, Logo, Menu } from './components'
import './header.css'

export const Header = () => {
	return (
		<header className="header">
			<div className="header-container">
				<Logo />
				<Menu />
				<ControlPanel />
			</div>
		</header>
	)
}
