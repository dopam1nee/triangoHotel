const express = require('express')
const { register } = require('../controllers/user')

const router = express.Router({ mergeParams: true })

// router.post('/register', async (req, res) => {
// 	try {
// 		const { user, token } = await register(
// 			req.body.login,
// 			req.body.email,
// 			req.body.password,
// 		)

// 		res.cookie('token', token, { httpOnly: true }).send({ user, token })
// 	} catch (err) {
// 		res.send({ err: err.message || 'Неизвестная ошибка...' })
// 	}
// })

module.exports = router
