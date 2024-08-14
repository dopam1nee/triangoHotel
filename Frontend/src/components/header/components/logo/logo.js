import { Link } from 'react-router-dom'
import logo from '../../../../img/DOPAM1NEE.png'
//import logo from '../../../../img/logo.png'
import './logo.css'

export const Logo = () => {
	return (
		<Link to="/" className="header-logo">
			<img
				className="header-logo-image"
				src={logo}
				alt="dopam1nee logo"
				width="178"
				height="11"
				loading="lazy" // изображение загрузится, когда пользователь дойдёт до него
			></img>
		</Link>
	)
}

//width = '168.32'
//height = '10.74'
