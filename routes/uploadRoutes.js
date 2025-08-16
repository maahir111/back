// SERVER/routes/uploadRoutes.js
import express from "express";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/", upload.single("image"), (req, res) => {
  try {
    res.json({
      success: true,
      imageUrl: req.file.path, // Cloudinary URL
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
