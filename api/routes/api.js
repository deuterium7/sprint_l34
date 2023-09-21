var express = require('express');
var router = express.Router();

// const auth = require('../middleware/auth');

const TodoRequest = require('../requests/TodoRequest');
const TodoController = require('../controllers/TodoController');

router.get('/todos', TodoController.index);
router.post('/todos', TodoRequest.index, TodoController.create);
router.get('/todos/:id(\\d+)', TodoController.get);
router.patch('/todos/:id(\\d+)', TodoRequest.index, TodoController.update);
router.delete('/todos/:id(\\d+)', TodoController.destroy);

module.exports = router;
