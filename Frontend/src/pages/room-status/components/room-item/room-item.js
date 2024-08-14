import './room-item.css'

export const RoomItem = ({ id, number, status }) => {
	//useEffect(() => {
	//	setSelectedRole(initialRole) // обновляем выбранную роль каждый раз, когда меняется начальная (при изменении на сервере)
	//}, [initialRole])

	return (
		<>
			{status ? (
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
