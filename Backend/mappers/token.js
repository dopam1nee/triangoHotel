const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../constants/secret')

const generateToken = id => jwt.sign(id, JWT_SECRET, { expiresIn: '30d' })

const verifyToken = token => jwt.verify(token, JWT_SECRET) // верифицируем токен (проверяем, совпадает ли токен с секретным ключом) и возвращаем данные пользователя и токена, если верификация прошла успешно

module.exports = {
	generateToken,
	verifyToken,
}
