const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
	checkInDate: {
		// дата заезда
		type: Date,
		required: true,
	},
	checkOutDate: {
		// дата выезда
		type: Date,
		required: true,
	},
})
// После бронирования создаётся новый документ в коллекции "bookings", содержащий информацию о датах заезда/выезда. Информация о забронированном номере в коллекции "rooms" (Room) обновляется, чтобы связать этот номер с только что созданным бронированием.

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking
