const Task = require('../models/Task');
const Project = require('../models/Project');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
exports.getTasks = async (req, res) => {
  try {
    let query;

    // Admin can see all tasks, member sees assigned tasks or tasks in their projects
    if (req.user.role === 'admin') {
      query = Task.find();
    } else {
      // Find projects the user is a member of
      const projects = await Project.find({ members: req.user.id });
      const projectIds = projects.map(p => p._id);
      
      // Tasks user is assigned to OR tasks in projects user is a member of
      query = Task.find({
        $or: [
          { assignedTo: req.user.id },
          { project: { $in: projectIds } }
        ]
      });
    }

    // Handle filtering (e.g., ?status=Completed&priority=High)
    if (req.query.status) {
      query = query.where('status').equals(req.query.status);
    }
    if (req.query.priority) {
      query = query.where('priority').equals(req.query.priority);
    }
    if (req.query.project) {
      query = query.where('project').equals(req.query.project);
    }

    const tasks = await query.populate('project', 'name').populate('assignedTo', 'name email').populate('createdBy', 'name email').sort('-createdAt');

    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private/Admin
exports.createTask = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;

    // Check if project exists
    const project = await Project.findById(req.body.project);
    if (!project) {
      return res.status(404).json({ success: false, error: 'Project not found' });
    }

    const task = await Task.create(req.body);

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    // Members can only update status of tasks they are assigned to or in their projects
    if (req.user.role !== 'admin') {
      const allowedUpdates = ['status'];
      const updates = Object.keys(req.body);
      const isValidOperation = updates.every(update => allowedUpdates.includes(update));

      if (!isValidOperation) {
        return res.status(403).json({ success: false, error: 'Not authorized to update fields other than status' });
      }
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('project', 'name').populate('assignedTo', 'name email');

    res.status(200).json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private/Admin
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    await task.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// @desc    Get dashboard stats
// @route   GET /api/tasks/stats
// @access  Private
exports.getDashboardStats = async (req, res) => {
  try {
    let query;

    if (req.user.role === 'admin') {
      query = Task.find();
    } else {
      const projects = await Project.find({ members: req.user.id });
      const projectIds = projects.map(p => p._id);
      query = Task.find({
        $or: [
          { assignedTo: req.user.id },
          { project: { $in: projectIds } }
        ]
      });
    }

    const tasks = await query;

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'Completed').length;
    const pendingTasks = tasks.filter(t => t.status === 'Todo').length;
    const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
    
    const now = new Date();
    const overdueTasks = tasks.filter(t => t.dueDate && new Date(t.dueDate) < now && t.status !== 'Completed').length;

    let recentProjectsQuery = Project.find().sort('-createdAt').limit(5);
    if (req.user.role !== 'admin') {
        recentProjectsQuery = recentProjectsQuery.find({ members: req.user.id });
    }
    const recentProjects = await recentProjectsQuery;

    res.status(200).json({
      success: true,
      data: {
        totalTasks,
        completedTasks,
        pendingTasks,
        inProgressTasks,
        overdueTasks,
        recentProjects
      }
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
