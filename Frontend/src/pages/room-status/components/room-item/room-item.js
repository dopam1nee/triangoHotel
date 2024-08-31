import './room-item.css'

export const RoomItem = ({ id, number, status, bookings }) => {
	return (
		<>
			{!bookings.length ? (
				<li className="room-item" key={id}>
					<h2>{number}</h2>
				</li>
			) : (
				<li className="room-item status-booked" key={id}>
					<h2>{number}</h2>
				</li>
			)}
		</>
	)
}
