const mapUser = user => {
	return {
		id: user._id,
		login: user.login,
		email: user.email,
		password: user.password,
		role: user.role,
	}
}
module.exports = mapUser
