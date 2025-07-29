import express from 'express';
import { addProject, getProjects, updateProject, deleteProject, getProjectById, upload } from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Add a new project
// @route   POST /api/projects
// @access  Private (Admin only)
router.post('/', protect, upload.single('image'), addProject);

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
router.get('/', getProjects);

// @desc    Get project by ID
// @route   GET /api/projects/:id
// @access  Public
router.get('/:id', getProjectById);

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private (Admin only)
router.put('/:id', protect, upload.single('image'), updateProject);

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private (Admin only)
router.delete('/:id', protect, deleteProject);

export default router; 