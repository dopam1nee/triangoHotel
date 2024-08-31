const mongoose = require('mongoose')
const mapRoom = require('./map-room')

const mapUserRooms = ({ rooms }) => {
	return {
		rooms: rooms.map(room =>
			mongoose.isObjectIdOrHexString(room) ? room : mapRoom(room),
		),
	}
}

module.exports = mapUserRooms
