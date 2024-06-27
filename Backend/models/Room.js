const mongoose = require('mongoose')
const validator = require('validator')
const status = require('../constants/status')

const roomSchema = new mongoose.Schema(
	{
		number: {
			type: Number,
			required: true,
			unique: true,
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
				validator: validator.isURL,
				message: 'Incorrect image URL',
			},
		},
		status: {
			type: Number,
			enum: [status.AVAILABLE, status.BOOKED], // значение должно быть одним из указанных
			default: status.AVAILABLE,
		},
		booking: {
			// связали выбранный номер с бронированием конкретного пользователя; когда бронируется номер, создаётся новый документ в коллекции "bookings". Значение ObjectId этого документа будет сохранено в поле bookings  этой схемы
			type: mongoose.Schema.Types.ObjectId, // тип - идентификатор; в нашем случае это id бронирования (даты)
			ref: 'Booking', // ссылка на модель Booking (коллекцию bookings в MongoDB); говорим, что выбранный номер относится к конкретному бронированию, чтобы знать, какое именно бронирование относится к этому номеру
		},
	},
	{ timestamps: true },
)

const Room = mongoose.model('Room', roomSchema)

module.exports = Room
