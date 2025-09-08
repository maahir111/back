import { Router } from "express";
import Project from "../models/Project.js";
import { protect } from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminOnly.js";

const router = Router();

// GET /api/projects (public) - ✅ SAX
router.get("/", async (req, res) => {
  try {
    const items = await Project.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// GET /api/projects/:id (public) - ✅ SAX
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

// POST /api/projects (admin only) - ✅ SAX
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { title, description, link, image } = req.body;
    if (!title || !link || !image) {
      return res.status(400).json({ error: "title, link, image are required" });
    }
    const created = await Project.create({ title, description, link, image });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create project" });
  }
});

// PUT update /api/projects/:id (admin only) - ✅ SAX
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/projects/:id (admin only) - ✅ SAX
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const deleted = await Project.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;












// import express from 'express';
// import { addProject, getProjects, updateProject, deleteProject, getProjectById} from '../controllers/projectController.js';
// import { protect } from '../middleware/authMiddleware.js';
// import upload from '../middleware/multer.js'; // ✅ Cloudinary Multer middleware
// import cloudinary from "../config/cloudinary.js";
// import Project from "../models/Project.js";

// const router = express.Router();


// router.post('/', protect, upload.single('image'), addProject);

// // @desc    Get all projects
// // @route   GET /api/projects
// // @access  Public
// router.get('/', getProjects);

// // @desc    Get project by ID
// // @route   GET /api/projects/:id
// // @access  Public
// router.get('/:id', getProjectById);

// // @desc    Update a project
// // @route   PUT /api/projects/:id
// // @access  Private (Admin only)
// router.put('/:id', protect, upload.single('image'), updateProject);

// // @desc    Delete a project
// // @route   DELETE /api/projects/:id
// // @access  Private (Admin only)
// router.delete('/:id', protect, deleteProject);

// export default router; 