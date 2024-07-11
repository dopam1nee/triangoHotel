const Booking = require('../models/Booking')
const Room = require('../models/Room')
const User = require('../models/User')

const addBooking = async (userId, roomId, dates) => {
	// TODO дописать контроллеры
	const newBooking = await Booking.create(dates) // { _id: new ObjectId('...'), checkIn: ..., checkOut: ... }
	const room = await Room.findByIdAndUpdate(roomId, {
		$push: { bookings: newBooking },
	}) // { _id: new ObjectId('...'), number: ..., bookings: [ new ObjectId('...') ] }

	await User.findByIdAndUpdate(userId, {
		$push: { rooms: room },
	})
	//.populate({
	//	path: 'rooms',
	//	select: '-createdAt -updatedAt -__v',
	//	populate: {
	//		path: 'bookings',
	//		select: '-createdAt -updatedAt -__v',
	//	},
	//})
	// или newBooking._id; добавили бронирование в массив забронированных номеров пользователя; раскрыли объект по id; преобразовали идентификатор в объект, в котором содержится информация о пользователе (по идентификатору)

	//console.log(user.rooms[0].bookings) // User.findByIdAndUpdate занести в константу user, и можно в консоли при бронировании увидеть [ { _id: new ObjectId('...'), checkIn: ..., checkOut: ... }, ... ]

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

const deleteBooking = async (userId, roomId, bookingId) => {
	await Booking.deleteOne({ _id: bookingId })

	const room = await Room.findByIdAndUpdate(roomId, {
		$pull: { bookings: bookingId },
	})

	await User.findByIdAndUpdate(userId, {
		$pull: { rooms: room._id },
	})
}

module.exports = {
	addBooking,
	getBookings,
	editBooking,
	deleteBooking,
}
