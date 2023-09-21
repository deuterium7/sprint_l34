const { isString, isBool } = require('../utils/common');

const index = async (req, res, next) => {
	try {
		let errors = {};

		if (!req.body.hasOwnProperty('title')) errors.title = 'Поле обязательно для заполения';
		if (!errors.title && !isString(req.body.title)) errors.title = 'Поле должно быть строкой';
		if (req.body.hasOwnProperty('completed') && !isBool(req.body.completed)) errors.completed = 'Поле должно быть булевым типом';

		if (Object.keys(errors).length) return res.status(422).json({ errors });

		next();
	} catch (e) {
		throw e;
	}
}

module.exports = { index };