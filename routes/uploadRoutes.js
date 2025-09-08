// // SERVER/routes/uploadRoutes.js
// import express from "express";
// import upload from "../middleware/multer.js";

// const router = express.Router();

// // Upload image
// router.post("/", upload.single("image"), (req, res) => {
//   try {
//     res.json({
//       success: true,
//       imageUrl: req.file.path, // Cloudinary URL
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });


// // Update image (delete old + upload new)
// router.put("/:public_id", upload.single("image"), async (req, res) => {
//   try {
//     const { public_id } = req.params;
//     if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });


//     // Delete old image
//     await cloudinary.uploader.destroy(public_id);

//     // Upload new image
//     res.json({
//       success: true,
//       imageUrl: req.file.path,
//       public_id: req.file.filename,
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// // Delete image
// router.delete("/:public_id", async (req, res) => {
//   try {
//     const { public_id } = req.params;

//     const result = await cloudinary.uploader.destroy(public_id);

//     if (result.result === "ok") {
//       res.json({ success: true, message: "Image deleted successfully" });
//     } else {
//       res.status(404).json({ success: false, message: "Image not found" });
//     }
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// export default router;
