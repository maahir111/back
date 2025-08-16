import express from 'express';
import { addTestimonial, getTestimonials, updateTestimonial, deleteTestimonial, getTestimonialById } from '../controllers/testimonialController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/multer.js';

const router = express.Router();

// @desc    Add a new testimonial
// @route   POST /api/testimonials
// @access  Private (Admin only)
router.post('/', protect, upload.single('image'), addTestimonial);

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
router.get('/', getTestimonials);

// @desc    Get single testimonial by ID
// @route   GET /api/testimonials/:id
// @access  Public
router.get('/:id', getTestimonialById);

// @desc    Update a testimonial
// @route   PUT /api/testimonials/:id
// @access  Private (Admin only)
router.put('/:id', protect, upload.single('image'), updateTestimonial);

// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private (Admin only)
router.delete('/:id', protect, deleteTestimonial);

export default router; 