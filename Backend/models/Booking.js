const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
	{
		checkIn: {
			// дата заезда
			type: String,
			required: true,
		},
		checkOut: {
			// дата выезда
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
)
// После бронирования создаётся новый документ в коллекции "bookings", содержащий информацию о датах заезда/выезда. Информация о забронированном номере в коллекции "rooms" (Room) обновляется, чтобы связать этот номер с только что созданным бронированием.

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking
