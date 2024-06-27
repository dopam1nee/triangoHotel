const mongoose = require('mongoose')
const status = require('../constants/status')

const bookingSchema = new mongoose.Schema(
	{
		checkIn: {
			// дата заезда
			type: Date,
			required: true,
		},
		checkOut: {
			// дата выезда
			type: Date,
			required: true,
		},
		status: {
			type: Number,
			default: status.BOOKED,
		},
	},
	{ timestamps: true },
)
// После бронирования создаётся новый документ в коллекции "bookings", содержащий информацию о датах заезда/выезда. Информация о забронированном номере в коллекции "rooms" (Room) обновляется, чтобы связать этот номер с только что созданным бронированием.

const Booking = mongoose.model('Booking', bookingSchema)

module.exports = Booking
