const express = require('express')
const {
	getRooms,
	getRoom,
	addRoom,
	editRoom,
	deleteRoom,
} = require('../controllers/room')
const { addBooking, deleteBooking } = require('../controllers/booking')
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

router.post('/:id/bookings', authenticated, async (req, res) => {
	// req - куча данных из браузера, cookies: { token: 'd45DT3j...' }, body: { checkIn: '15.11.2024', checkOut: '20.11.2024' }, route: Route { path: '/:id/book', ..., methods: { post: true }, user: { _id: new ObjectId('658d303d...'), login: 'dopa', ..., roomss: [ new ObjectId('854d4292...'), new... ] }, cookie: 'token=d45DT3j...', host: 'localhost:3001', ...}
	const reqUser = await User.findById(req.user) // { _id: new ObjectId('658d303d...'), login: 'dopa', ..., roomss: [ new ObjectId('854d4292...'), new... ] }
	const reqUserId = await User.findById(req.user._id) // { _id: new ObjectId('658d303d...'), login: 'dopa', ..., roomss: [ new ObjectId('854d4292...'), new... ] }
	// Записи req.user и req.user._id дадут один и тот же результат
	const userId = reqUser.id // 658d303d...
	const userUnderId = reqUser._id // new ObjectId('658d303d...')

	// req.params.id - 3499ubc...
	const newBooking = await addBooking(req.user.id, req.params.id, {
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

router.delete('/:id/bookings/:bookingId', authenticated, async (req, res) => {
	await deleteBooking(req.user.id, req.params.id, req.params.bookingId)

	res.send({ error: null })
})

module.exports = router
