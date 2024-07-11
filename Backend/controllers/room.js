const Room = require('../models/Room')

const addRoom = async room => {
	const newRoom = await Room.create(room) // создаём номер в БД

	await newRoom.populate({
		path: 'bookings',
		select: 'checkIn checkOut',
	}) // заполняем связанные документы, т.е. в newRoom будут не просто ссылки на документы (id), а целые объекты этих документов

	return newRoom
}

const getRooms = () => Room.find()

const getRoom = id =>
	Room.findById(id).populate({
		path: 'bookings',
		select: '-createdAt -updatedAt -__v',
	})

const editRoom = async (id, room) => {
	const newRoom = await Room.findByIdAndUpdate(id, room, { returnDocument: 'after' }) // ищем документ Room по id и обновляем его данными room, возвращая обновлённый документ

	await newRoom.populate('booking', 'checkIn checkOut') // короткая запись

	return newRoom
}

const deleteRoom = id => Room.findByIdAndDelete(id)

module.exports = {
	addRoom,
	getRooms,
	getRoom,
	editRoom,
	deleteRoom,
}
