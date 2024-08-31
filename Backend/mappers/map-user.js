const mapUser = user => {
	return {
		id: user._id,
		login: user.login,
		email: user.email,
		password: user.password,
		role: user.role,
		rooms: user.rooms,
		registeredAt: new Date(user.createdAt).toLocaleDateString('en-GB', {
			year: '2-digit',
			month: '2-digit',
			day: '2-digit',
		}),
	}
}

module.exports = mapUser
