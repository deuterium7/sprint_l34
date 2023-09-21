const Todo = require('./Todo');

const init = async () => {
	await Todo.sync({ alter: true });
}

module.exports = { init, Todo };