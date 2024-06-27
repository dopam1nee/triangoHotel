const hasRole = roles => (req, res, next) => {
	if (!roles.includes(req.user.role)) {
		// если роли пользователя не совпадают с ролями, которые мы передаем в параметре, возвращаем ошибку
		res.send({ error: 'Доступ запрещён' })

		return
	}

	next()
}

module.exports = hasRole
