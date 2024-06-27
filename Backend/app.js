require('dotenv').config() // загружаем переменные окружения из файла .env с помощью config из dotenv

const express = require('express') // фреймворк Express.js для создания веб-сервера и построения API-приложения
const mongoose = require('mongoose') // библиотека для работы с MongoDB, которая упрощает взаимодействие с базой данных
const cookieParser = require('cookie-parser') // библиотека для работы с куками; req.cookies
const routes = require('./routes') // маршруты
const chalk = require('chalk') // форматирование текста в консоли

const port = 3001 // порт, на котором будет запущен сервер
const app = express() // создаём экземпляр приложения

app.use(express.static('../Frontend/build')) // подключаем статические файлы (html, css, js, images) из папки Frontend/build; статические файлы отличаются от динамических файлов тем, что их содержимое не меняется в зависимости от запроса. Сервер просто отдает их клиенту без какой-либо предварительной обработки.

app.use(cookieParser()) // подключаем middleware-функцию (промежуточная функция до или после обработки запроса, она стоит между маршрутом и обработчиком запроса), которая позволяет работать с куками
app.use(express.json()) // парсит входящий JSON-контент и добавляет его к объекту req.body

app.use('/', routes) // подключаем маршруты (запросы)

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
	// подключаемся к базе данных
	app.listen(port, () => {
		// запускаем сервер после подключения к базе данных
		console.log(chalk.blueBright(`Server has been started on port ${port}...`))
	})
})

// идентификатор на бэке - _id (генерирует MongoDB), на фронте - id (преобразуем с помощью мапперов и отдаём на клиент)

// req.body - тело запроса (форма)
//app.post('/users', (req, res) => {
//  console.log(req.body) // { name: 'dopamine', email: 'dopa@example.com', password: 'abc123' }
//})

// req.params - параметры маршрута (ссылка)
//app.get('/users/:id', (req, res) => {
//console.log(req.params) // { id: '123' }
//})

// req.query - параметры запроса (поиск)
//app.get('/search', (req, res) => {
//console.log(req.query) // { q: 'javascript', page: '2' }
//}) // URL: /search?q=javascript&page=2
