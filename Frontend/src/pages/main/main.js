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
			<h1 className="visually-hidden">Triango's hotel</h1>
			{/* TODO loader */}
			<ul className="room-list">
				{rooms.map(({ id, number, info, price, images, status }) => (
					<RoomCard
						key={id}
						id={id}
						number={number}
						info={info}
						price={price}
						images={images}
						status={status}
					/>
				))}
			</ul>
			{/* TODO pagination */}
		</main>
	)
}
