const Todo = require('../models/Todo');

class TodoService {
	async getAll() {
		try {
			return await Todo.findAll();
		} catch (e) {
			throw e;
		}
	}

	async findById(id) {
		try {
			return await Todo.findByPk(id);
		} catch (e) {
			throw e;
		}
	}

	async create(data) {
		try {
			return await Todo.create(data);
		} catch (e) {
			throw e;
		}
	}

	async update(id, data) {
		try {
			return await Todo.update(
				Object.assign({ updated_at: new Date() }, data),
				{ where: { id: id }, silent: false }
			);
		} catch (e) {
			throw e;
		}
	}

	async destroy(id) {
		try {
			return await Todo.destroy({
				where: { id: id }
			});
		} catch (e) {
			throw e;
		}
	}
}

module.exports = TodoService;