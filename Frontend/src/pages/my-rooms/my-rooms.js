import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { request } from '../../utils/request'
import { selectUserId } from '../../selectors'
import { MyRoomCard } from './components'
import '../main/main.css'

export const MyRooms = () => {
	const [myRooms, setMyRooms] = useState([])

	const userId = useSelector(selectUserId)

	useEffect(() => {
		request(`/users/${userId}/rooms`).then(({ data }) => setMyRooms(data.rooms))
	}, [userId])

	return (
		<div className="main">
			{/* TODO loader */}
			<h1>My rooms</h1>
			{myRooms.length ? (
				<ul className="room-list">
					{myRooms.map(({ id, number, info, price, images }) => (
						<MyRoomCard
							key={number}
							id={id}
							number={number}
							info={info}
							price={price}
							images={images}
						/>
					))}
				</ul>
			) : (
				<div className="rooms-not-found">
					<h1>Rooms not found</h1>
				</div>
			)}
			{/* TODO pagination */}
		</div>
	)
}
