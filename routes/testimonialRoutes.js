import { Router } from "express";
import Testimonial from "../models/Testimonial.js";
import { protect } from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminOnly.js";

const router = Router();

// GET /api/testimonials (Public) - ✅ SAX
router.get("/", async (req, res) => {
  try {
    const items = await Testimonial.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch testimonials" });
  }
});

// GET /api/testimonials/:id (Public) - ✅ SAX
router.get("/:id", async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ error: "Testimonial not found" });
    }
    res.json(testimonial);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch testimonial" });
  }
});

// POST /api/testimonials (Admin only) - ✅ SAX
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { fullName, title, message, image } = req.body;
    if (!fullName || !message || !image) {
      return res.status(400).json({ 
        error: "fullName, message, and image are required" 
      });
    }
    const created = await Testimonial.create({ fullName, title, message, image });
    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create testimonial" });
  }
});

// PUT update /api/testimonials/:id (Admin only) - ✅ SAX
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const updated = await Testimonial.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!updated) {
      return res.status(404).json({ error: "Testimonial not found" });
    }
    
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/testimonials/:id (Admin only) - ✅ SAX
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const deleted = await Testimonial.findByIdAndDelete(req.params.id);
    
    if (!deleted) {
      return res.status(404).json({ error: "Testimonial not found" });
    }
    
    res.json({ message: "Testimonial deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete testimonial" });
  }
});

export default router;


































// import express from 'express';
// import { addTestimonial, getTestimonials, updateTestimonial, deleteTestimonial, getTestimonialById } from '../controllers/testimonialController.js';
// import { protect } from '../middleware/authMiddleware.js';
// import upload from '../middleware/multer.js';

// const router = express.Router();

// // @desc    Add a new testimonial
// // @route   POST /api/testimonials
// // @access  Private (Admin only)
// router.post('/', protect, upload.single('image'), addTestimonial);

// // @desc    Get all testimonials
// // @route   GET /api/testimonials
// // @access  Public
// router.get('/', getTestimonials);

// // @desc    Get single testimonial by ID
// // @route   GET /api/testimonials/:id
// // @access  Public
// router.get('/:id', getTestimonialById);

// // @desc    Update a testimonial
// // @route   PUT /api/testimonials/:id
// // @access  Private (Admin only)
// router.put('/:id', protect, upload.single('image'), updateTestimonial);

// // @desc    Delete a testimonial
// // @route   DELETE /api/testimonials/:id
// // @access  Private (Admin only)
// router.delete('/:id', protect, deleteTestimonial);

// export default router; 