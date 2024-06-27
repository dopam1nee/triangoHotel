const mapBooking = booking => {
	return {
		id: booking._id,
		checkIn: booking.checkIn,
		checkOut: booking.checkOut,
	}
}
module.exports = mapBooking
