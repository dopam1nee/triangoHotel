const mapBooking = require('./map-booking')

const mapRoom = room => {
	return {
		id: room._id,
		number: room.number,
		info: room.info,
		price: room.price,
		images: room.images,
		status: room.status,
		bookings: room.bookings, // TODO
		bookings: room.bookings.map(booking => ({
			id: booking._id,
			checkIn: booking.checkIn,
			checkOut: booking.checkOut,
		})),
		//bookings: room.bookings.map(
		//	booking =>
		//		mongoose.isObjectIdOrHexString(booking) ? booking : mapBooking(booking), // проверяем, является ли текущий элемент строкой ObjectId или шестнадцатеричной строкой
		//),
	}
}

module.exports = mapRoom
