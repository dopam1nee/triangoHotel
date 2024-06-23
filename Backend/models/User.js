const mongoose = require('mongoose')
const roles = require('../constants/roles')

const userSchema = new mongoose.Schema(
	{
		// схема (структура) документов, хранящихся в коллекции "users" в MongoDB
		login: {
			// поле
			type: String, // тип данных
			required: true, // значение обязательно
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: Number,
			default: roles.USER, // значение по умолчанию
		},
	},
	{ timestamps: true }, // добавляет дату и время создания и обновления документа в MongoDB
)
// не указываем id явно, потому что MongoDB генерирует его автоматически _id

const User = mongoose.model('User', userSchema) // модель для работы с коллекцией "users" (mongoose автоматически преобразует название User в "users" при создании коллекции) в MongoDB
// DAO (Data Access Object) - это паттерн проектирования, где модель выступает в качестве объекта, отвечающего за доступ к данным.
// В контексте MongoDB, где данные хранятся в виде документов, модель - это документ.

module.exports = User
