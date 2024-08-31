import { useEffect, useState } from 'react'
import { RoomCard } from './components'
import { request } from '../../utils/request'
import './main.css'

export const Main = () => {
	const [rooms, setRooms] = useState([])

	useEffect(() => {
		request('/rooms').then(({ data }) => setRooms(data))
	}, [])

	return (
		<main className="main">
			<h1 className="visually-hidden">dopam1nee's hotel</h1>
			{/* TODO loader */}
			{rooms.length ? (
				<ul className="room-list">
					{rooms.map(({ id, number, info, price, images, status, bookings }) => (
						<RoomCard
							key={id}
							id={id}
							number={number}
							info={info}
							price={price}
							images={images}
							status={status}
							bookings={bookings}
						/>
					))}
				</ul>
			) : (
				<div className="rooms-not-found">
					<h1>Rooms not found</h1>
				</div>
			)}
			{/* TODO pagination */}
		</main>
	)
}
