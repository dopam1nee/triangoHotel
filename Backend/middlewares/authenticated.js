const { verifyToken } = require('../mappers/token')
const User = require('../models/User')

const authenticated = async (req, res, next) => {
	if (!req.cookies.token) {
		res.send({ error: 'Токен отсутствует' })

		return // останавливаем выполнение функции
	}

	const tokenData = verifyToken(req.cookies.token) // верифицируем токен
	const user = await User.findOne({ _id: tokenData.id }) // ищем пользователя по данным из токена (в нём хранятся данные в пользователе)

	if (!user) {
		res.send({ error: 'Пользователь не найден' })

		return
	}

	req.user = user // если пользователь найден, добавляем его в объект запроса, чтобы его можно было использовать в других частях приложения

	next() // передаём управление следующему middleware-обработчику в цепочке
}

module.exports = authenticated
