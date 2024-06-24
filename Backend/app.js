require('dotenv').config() // загружаем переменные окружения из файла .env с помощью config из dotenv

const express = require('express') // фреймворк Express.js для создания веб-сервера и построения API-приложения
const mongoose = require('mongoose') // библиотека для работы с MongoDB, которая упрощает взаимодействие с базой данных
const cookieParser = require('cookie-parser') // библиотека для работы с куками; req.cookies
const chalk = require('chalk') // форматирование текста в консоли
// const routes = require('./routes') // маршруты
const { register } = require('./controllers/user')
const mapUser = require('./helpers/map-user')
const port = 3001 // порт, на котором будет запущен сервер
const app = express() // создаём экземпляр приложения

app.use(express.static('../Frontend/build')) // подключаем статические файлы (html, css, js, images) из папки Frontend/build; статические файлы отличаются от динамических файлов тем, что их содержимое не меняется в зависимости от запроса. Сервер просто отдает их клиенту без какой-либо предварительной обработки.

app.use(cookieParser()) // подключаем middleware-функцию (промежуточная функция до или после обработки запроса, она стоит между маршрутом и обработчиком запроса), которая позволяет работать с куками
app.use(express.json()) // парсит входящий JSON-контент и добавляет его к объекту req.body
app.post('/register', async (req, res) => {
	try {
		const { user, token } = await register(
			req.body.login,
			req.body.email,
			req.body.password,
		)
		res
			.cookie('token', token, { httpOnly: true })
			.send({ error: null, user: mapUser(user) })
	} catch (err) {
		res.send({ error: err.message || 'Неизвестная ошибка...' })
	}
})
// app.use('/', routes) // подключаем маршруты

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
	// подключаемся к базе данных
	app.listen(port, () => {
		// запускаем сервер после подключения к базе данных
		console.log(chalk.green(`Server has been started on port ${port}...`))
	})
})
