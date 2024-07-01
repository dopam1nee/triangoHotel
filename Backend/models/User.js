const mongoose = require('mongoose')
const roles = require('../constants/roles')

const userSchema = new mongoose.Schema(
	{
		// схема (структура) документов, хранящихся в коллекции "users" в MongoDB
		login: {
			// поле
			type: String, // тип данных
			required: true, // значение обязательно
			unique: true, // уникальное значение
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: Number,
			default: roles.USER, // значение по умолчанию
		},
		userBookings: [
			{
				// связали выбранный номер с бронированием конкретного пользователя; когда бронируется номер, создаётся новый документ в коллекции "bookings". Значение ObjectId этого документа будет сохранено в поле bookings  этой схемы
				type: mongoose.Schema.Types.ObjectId, // тип - идентификатор; в нашем случае это id бронирования (даты)
				ref: 'Booking', // ссылка на модель Booking (коллекцию bookings в MongoDB); говорим, что выбранный номер относится к конкретному бронированию, чтобы знать, какое именно бронирование относится к этому номеру
			}, // здесь мы храним только id бронирований, а не сами бронирования, что значительно увеличивает производительность, а также благодаря этому бронирования автоматически удалятся, если пользователь будет удалён
		],
	},
	{ timestamps: true }, // добавляет дату и время создания и обновления документа в MongoDB
)
// не указываем id явно, потому что MongoDB генерирует его автоматически (_id)

const User = mongoose.model('User', userSchema) // модель для работы с коллекцией "users" (mongoose автоматически преобразует название User в "users" при создании коллекции) в MongoDB
// DAO (Data Access Object) - это паттерн проектирования, где модель выступает в качестве объекта, отвечающего за доступ к данным.
// В контексте MongoDB, где данные хранятся в виде документов, модель - это документ.

module.exports = User
