import { Link } from 'react-router-dom'
import { Carousel } from './components'
import './room-card.css'

export const RoomCard = ({ id, number, info, price, images, status }) => {
	return (
		<>
			{status ? (
				<li className="room-card" key={id}>
					<div className="room-card-slider room-card-block">
						<Carousel images={images} />
					</div>

					<div className="room-card-info room-card-block">
						<div className="info-title">
							<span>Room {number}</span>
						</div>
						<div className="info-description">
							<span>{info}</span>
						</div>
					</div>
					<div className="room-card-price room-card-block">
						<span className="price">{price} €</span>
						<Link
							to="/book"
							className="header-link-sign-up control-panel-link link book-link"
						>
							Book
						</Link>
					</div>
				</li>
			) : (
				<></>
			)}
		</>
	)
}
