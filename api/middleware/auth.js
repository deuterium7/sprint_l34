const auth = async (req, res, next) => {
	if (!req.headers['Authorization']) return res.status(401).json({ message: 'Отсутствует токен авторизации' })

	// TODO: валидация токена и т.д.

	next();
}

module.exports = auth;