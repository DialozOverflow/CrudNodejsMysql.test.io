const express = require('express');
const TaskController = require('../controllers/TaskController');

const router = express.Router();

router.get('/tasks', TaskController.index);
router.get('/inicio', TaskController.inicio);
router.get('/condiciones', TaskController.condiciones);
router.post('/', TaskController.store);
router.post('/inicio', TaskController.updateuserinfo);

module.exports = router;