const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../constants/secret')

const generateToken = id => {
	jwt.sign(id, JWT_SECRET, { expiresIn: '30d' })
}
module.exports = {
	generateToken,
}
