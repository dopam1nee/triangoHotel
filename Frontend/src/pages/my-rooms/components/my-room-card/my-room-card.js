import { useDispatch } from 'react-redux'
import { openBookCard } from '../../../../actions'
import { Carousel } from '../../../main/components/room-card/components'
import '../../../main/components/room-card/room-card.css'

export const MyRoomCard = ({ id, number, info, price, images }) => {
	const dispatch = useDispatch()

	const onBookButtonClick = () => {
		//request('/:id/bookings', 'POST', {})
		dispatch(openBookCard)
	}

	return (
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
				<button
					className="header-link-sign-up control-panel-link link book-link"
					type="button"
					onClick={onBookButtonClick}
				>
					Book
				</button>
			</div>
		</li>
	)
}
