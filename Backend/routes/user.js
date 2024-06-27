const express = require('express')
const { getUsers, getUser, updateUser, deleteUser } = require('../controllers/user')
const authenticated = require('../middlewares/authenticated')
const hasRole = require('../middlewares/has-role')
const mapUser = require('../mappers/map-user')
const ROLES = require('../constants/roles')

const router = express.Router({ mergeParams: true })

router.get('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	// передаём маршрут и три мидлвара: проверка пользователя, проверка ролей, получение пользователей
	const users = await getUsers()

	res.send({ data: users.map(mapUser) })
})

router.get('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	// /users/50213580ub23959du87
	const user = await getUser(req.params.id)

	res.send({ data: mapUser(user) })
})

router.patch('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	const newUser = await updateUser(req.params.id, req.body) // передаём id из параметров маршрута (:id) и тело запроса (введённые пользователем данные)

	res.send({ data: mapUser(newUser) })
})

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	await deleteUser(req.params.id)

	res.send({ error: null })
})

module.exports = router
