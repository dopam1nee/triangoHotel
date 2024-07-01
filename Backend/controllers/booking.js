const Booking = require('../models/Booking')
const Room = require('../models/Room')

const addBooking = async (roomId, booking) => {
	// TODO дописать контроллеры
	const newBooking = await Booking.create(booking)

	await Room.findByIdAndUpdate(roomId, { $push: { bookings: newBooking._id } }) // или просто newBooking; привязали бронирование к номеру комнаты

	//await newBooking.populate('room') // раскрыли объект по id; преобразовали идентификатор в объект, в котором содержится информация о пользователе (по идентификатору)

	return newBooking
}

const getBookings = id => Booking.find({ _id: id })

const editBooking = async (id, room) => {
	const newBooking = await Booking.findByIdAndUpdate(id, room, {
		returnDocument: 'after',
	}) // ищем документ Room по id и обновляем его данными room, возвращая обновлённый документ

	await newBooking.populate('booking', 'checkIn checkOut') // короткая запись

	return newBooking
}

const deleteBooking = id => Booking.findByIdAndDelete(id)

module.exports = {
	addBooking,
	getBookings,
	editBooking,
	deleteBooking,
}
