const mongoose = require('mongoose')
const validator = require('validator')

const roomSchema = new mongoose.Schema({
	number: {
		type: String,
		required: true,
	},
	info: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	image: {
		type: String,
		required: true,
		validate: {
			// валидация
			validator: validator.isURL, // ключ validator можно назвать иначе (например, checkUrl); значение - функция валидации isURL из библиотеки validator
			message: 'Incorrect image URL', // сообщение об ошибке
		},
	},
	status: {
		type: Boolean,
		default: false,
	},
	bookings: {
		// связали выбранный номер с бронированием конкретного пользователя; когда бронируется номер, создаётся новый документ в коллекции "bookings". Значение ObjectId этого документа будет сохранено в поле bookings  этой схемы
		type: mongoose.Schema.Types.ObjectId, // тип - идентификатор; в нашем случае это id бронирования (даты)
		ref: 'Booking', // ссылка на модель Booking (коллекцию bookings в MongoDB); говорим, что выбранный номер относится к конкретному бронированию, чтобы знать, какое именно бронирование относится к этому номеру
	},
})

const Room = mongoose.model('Room', roomSchema)

module.exports = Room
