const mapBooking = booking => {
	return {
		id: booking._id,
		checkIn: booking.checkIn,
		checkOut: booking.checkOut,
		user: booking.user,
	}
}

module.exports = mapBooking
