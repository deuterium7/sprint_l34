const TodoService = require('../services/TodoService');
const { inDebug } = require('../utils/common');
const service = new TodoService();

const index = async (req, res) => {
	try {
		const todos = await service.getAll(req);
		return res.status(200).json({data: todos, meta: { total: todos.length }});
	} catch (e) {
		return inDebug ? res.status(400).json(e) : res.sendStatus(400);
	}
}

const create = async (req, res) => {
	try {
		const todo = await service.create(req.body);
		return res.status(201).json(todo);
	} catch (e) {
		return inDebug ? res.status(400).json(e) : res.sendStatus(400);
	}
}

const get = async (req, res) => {
	try {
		const todo = await service.findById(req.params.id);
		return res.status(200).json(todo);
	} catch (e) {
		return inDebug ? res.status(400).json(e) : res.sendStatus(400);
	}
}

const update = async (req, res) => {
	try {
		await service.update(req.params.id, req.body);

		const todo = await service.findById(req.params.id);

		return res.status(200).json(todo);
	} catch (e) {
		return inDebug ? res.status(400).json(e) : res.sendStatus(400);
	}
}

const destroy = async (req, res) => {
	try {
		await service.destroy(req.params.id);
		return res.sendStatus(204);
	} catch (e) {
		return inDebug ? res.status(400).json(e) : res.sendStatus(400);
	}
}

module.exports = { index, get, create, update, destroy };