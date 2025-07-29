import Testimonial from '../models/Testimonial.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';


// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Sawirada waxaa lagu kaydinayaa galka 'uploads/'
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// Init upload middleware
const upload = multer({ storage: storage });

// @desc    Add a new testimonial
// @route   POST /api/testimonials
// @access  Public
const addTestimonial = async (req, res) => {
  try {
    const { fullName, subject, text, rating } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : ''; // Save the path to the image

    const newTestimonial = new Testimonial({
      fullName,
      subject,
      text,
      rating,
      image,
    });

    const createdTestimonial = await newTestimonial.save();
    res.status(201).json(createdTestimonial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all testimonials
// @route   GET /api/testimonials
// @access  Public
const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({});
    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single testimonial by ID
// @route   GET /api/testimonials/:id
// @access  Public
const getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (testimonial) {
      res.status(200).json(testimonial);
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a testimonial
// @route   PUT /api/testimonials/:id
// @access  Public
const updateTestimonial = async (req, res) => {
  try {
    const { fullName, subject, text, rating } = req.body;
    let image = req.body.image; // Haddii sawirka cusub aan lasoo dirin

    const testimonial = await Testimonial.findById(req.params.id);

    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    // Haddii sawir cusub la upload-gareeyay
    if (req.file) {
      image = `/uploads/${req.file.filename}`;

      // Haddii testimonial-ka uu horey u lahaa sawir, tirtir kii hore
      if (testimonial.image) {
        const oldImagePath = path.join('uploads', path.basename(testimonial.image));
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            console.error('Failed to delete old image:', err);
          } else {
            console.log('Old image deleted:', oldImagePath);
          }
        });
      }
    }

    // Update xogaha
    testimonial.fullName = fullName || testimonial.fullName;
    testimonial.subject = subject || testimonial.subject;
    testimonial.text = text || testimonial.text;
    testimonial.rating = rating || testimonial.rating;
    testimonial.image = image || testimonial.image;

    const updatedTestimonial = await testimonial.save();
    res.json(updatedTestimonial);

  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// @desc    Delete a testimonial
// @route   DELETE /api/testimonials/:id
// @access  Public
const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);

    if (testimonial) {
      // Haddii testimonial-ka leeyahay sawir, ka saar file-ka disk-ga
      if (testimonial.image) {
        const filePath = path.join('uploads', path.basename(testimonial.image));
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error('Failed to delete image file:', err);
          } else {
            console.log('Image file deleted:', filePath);
          }
        });
      }

      await testimonial.deleteOne(); // Delete from DB
      res.json({ message: 'Testimonial removed' });
    } else {
      res.status(404).json({ message: 'Testimonial not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { addTestimonial, getTestimonials, getTestimonialById, updateTestimonial, deleteTestimonial, upload }; 