const express = require('express');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getDashboardStats
} = require('../controllers/taskController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.get('/stats', getDashboardStats);

router.route('/')
  .get(getTasks)
  .post(authorize('admin'), createTask);

router.route('/:id')
  .put(updateTask)
  .delete(authorize('admin'), deleteTask);

module.exports = router;
