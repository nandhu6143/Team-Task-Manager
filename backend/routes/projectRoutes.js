const express = require('express');
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// All project routes require authentication
router.use(protect);

router.route('/')
  .get(getProjects)
  .post(authorize('admin'), createProject);

router.route('/:id')
  .get(getProject)
  .put(authorize('admin'), updateProject)
  .delete(authorize('admin'), deleteProject);

module.exports = router;
