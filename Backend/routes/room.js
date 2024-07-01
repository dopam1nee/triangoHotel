const express = require('express')
const {
	getRooms,
	getRoom,
	addRoom,
	editRoom,
	deleteRoom,
} = require('../controllers/room')
const { addBooking } = require('../controllers/booking')
const authenticated = require('../middlewares/authenticated')
const hasRole = require('../middlewares/has-role')
const mapRoom = require('../mappers/map-room')
const mapBooking = require('../mappers/map-booking')
const ROLES = require('../constants/roles')
const User = require('../models/User')

const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
	const rooms = await getRooms()

	res.send({ data: rooms.map(mapRoom) })
})

router.get('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	const room = await getRoom(req.params.id)

	res.send({ data: mapRoom(room) })
})

router.post('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	const newRoom = await addRoom({
		number: req.body.number,
		info: req.body.info,
		price: req.body.price,
		image: req.body.image,
	})

	res.send({ data: mapRoom(newRoom) })
})

router.post('/:id/book', authenticated, async (req, res) => {
	//const user = await User.findById(req.user._id)
	//const userId = user._id

	const newBooking = await addBooking(req.params.id, {
		checkIn: req.body.checkIn,
		checkOut: req.body.checkOut,
	})

	res.send({ data: mapBooking(newBooking) })
})

router.patch('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	const newRoom = await editRoom(req.params.id, req.body)

	res.send({ data: mapRoom(newRoom) })
})

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	await deleteRoom(req.params.id)

	res.send({ error: null })
})

module.exports = router
