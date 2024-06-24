const bcrypt = require('bcrypt')
const User = require('../models/User')
const ROLES = require('../constants/roles')
const { generateToken } = require('../helpers/token')

const register = async (login, email, password) => {
	if (!login) {
		throw new Error('Этот логин уже существует!')
	} else if (!email) {
		throw new Error('Этот email уже существует!')
	} else if (!password) {
		throw new Error('Пароль не может быть пустым!')
	}
	const passwordHash = await bcrypt.hash(password, 10)

	const user = await User.create({ login, email, password: passwordHash })

	token = generateToken({ id: user.id })

	return { user, token }
}
module.exports = { register }
