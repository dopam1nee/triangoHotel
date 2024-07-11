const bcrypt = require('bcrypt') // библиотека для шифрования пароля
const User = require('../models/User')
const { generateToken } = require('../mappers/token')

const register = async (login, email, password) => {
	if (!password) {
		throw new Error('Пароль не может быть пустым')
	}

	const passwordHash = await bcrypt.hash(password, 10) // шифруем пароль; пароль, количество шифрований пароля

	const user = await User.create({ login, email, password: passwordHash }) // создаём пользователя в БД

	const token = generateToken({ id: user.id }) // генерируем токен для текущей сессии

	return { user, token }
}

const login = async (login, password) => {
	// TODO переделать login, email
	const user = await User.findOne({ login }) // ищем документ с пользователем в БД по логину

	if (!user) {
		throw new Error('Неверный логин')
	}

	const isPasswordMatch = await bcrypt.compare(password, user.password) // сравниваем введённый пароль с паролем из БД

	if (!isPasswordMatch) {
		throw new Error('Неверный пароль')
	}

	const token = generateToken({ id: user.id })

	return { user, token }
}

const getUsers = () => User.find() // возвращаем всех пользователей из БД

const getUser = id =>
	User.findById(id).populate({
		path: 'rooms',
		select: '-createdAt -updatedAt -__v',
		populate: {
			path: 'bookings',
			select: '-createdAt -updatedAt -__v',
		},
	}) // возвращаем пользователя по id, разворачивая объект забронированных номеров - ObjectId('...') => { _id: new ObjectId('...'), number: ..., bookings: [ new ObjectId('...') ] }

const updateUser = (id, userData) =>
	User.findByIdAndUpdate(id, userData, { returnDocument: 'after' }) // передаём id, по которому будем искать, и данные, которыми будем обновлять; возвращаем обновлённый документ с пользователем; returnDocument: 'after' - возвращаем документ после обновления, а не до

const deleteUser = id => User.deleteOne({ _id: id }) // удаляем пользователя из БД

module.exports = {
	register,
	login,
	getUsers,
	getUser,
	updateUser,
	deleteUser,
}
