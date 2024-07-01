const mapRoom = room => {
	return {
		id: room._id,
		number: room.number,
		info: room.info,
		price: room.price,
		image: room.image,
		status: room.status,
	}
}
module.exports = mapRoom
