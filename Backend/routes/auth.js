const express = require('express')
const { register, login } = require('../controllers/user') // подключаем обработчики запроса
const mapUser = require('../mappers/map-user')

const router = express.Router({ mergeParams: true })

router.post('/register', async (req, res) => {
	try {
		const { user, token } = await register(
			req.body.login,
			req.body.email,
			req.body.password,
		) // вызываем функцию регистрации, передавая данные из тела запроса, получаем пользователя и токен

		res
			.cookie('token', token, { httpOnly: true }) // записываем токен в куки и запрещаем обращаться к нему с клиента (браузера)
			.send({ error: null, user: mapUser(user) }) // отправляем объект пользователя после успешной регистрации
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка в регистрации...' })
	}
})

router.post('/login', async (req, res) => {
	try {
		const { user, token } = await login(req.body.login, req.body.password)

		res
			.cookie('token', token, { httpOnly: true })
			.send({ error: null, user: mapUser(user) })
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка во входе...' })
	}
})

router.post('/logout', (req, res) => {
	res.cookie('token', '', { httpOnly: true }).send({}) // удаляем куки с токеном (меняем на пустую строку) и отправляем пустой объект, потому что пользователь вышел из системы, следовательно, ему не нужны какие-либо данные
})

module.exports = router
