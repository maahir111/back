export const createProject = async (req, res) => {
  try {
    const { title, description, link, image } = req.body;

    // Validate required fields
    if (!title || !link || !image) {
      return res.status(400).json({
        error: "Title, link, and image are required"
      });
    }

    const project = await Project.create({
      title,
      description: description || "",
      link,
      image
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("Create project error:", error);
    
    // Mongoose validation error
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
    
    // Duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ error: "Project already exists" });
    }
    
    res.status(500).json({ error: "Internal server error" });
  }
};







// import express from 'express';
// import Project from '../models/Project.js'; // Waa in uu jiraa
// import cloudinary from "../config/cloudinary.js";
// import upload from "../middleware/multer.js";


// const router = express.Router();

// // Create new project (title + description + image)

// const addProject = async (req, res) => {
//   try {
//     const { title, description, link } = req.body;

//     const newProject = new Project({
//       title,
//       description,
//       link,
//       imageUrl: req.file.path,     // Cloudinary image URL
//       public_id: req.file.filename // Cloudinary public_id
//     });

//     const createdProject = await newProject.save();
//     res.status(201).json(createdProject);
//   } catch (error) {
//     console.error("Add Project Error:", error); // Log error
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get all projects
// const getProjects = async (req, res) => {
//   try {
//     const projects = await Project.find({});
//     res.status(200).json(projects);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update project
// // Update project
// const updateProject = async (req, res) => {
//   try {
//     const { title, description, link } = req.body;
//     const project = await Project.findById(req.params.id);

//     if (project) {
//       project.title = title || project.title;
//       project.description = description || project.description;
//       project.link = link || project.link;

//       if (req.file) {
//         // Delete old image from Cloudinary
//         await cloudinary.uploader.destroy(project.public_id);
//         project.imageUrl = req.file.path;
//         project.public_id = req.file.filename;
//       }

//       const updatedProject = await project.save();
//       res.json(updatedProject);
//     } else {
//       res.status(404).json({ message: "Project not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// // Delete project
// const deleteProject = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project) return res.status(404).json({ message: "Not found" });

//     await cloudinary.uploader.destroy(project.public_id);
//     await project.deleteOne();

//     res.json({ success: true, message: "Project deleted" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// // getProjectById
// const getProjectById = async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id);

//     if (project) {
//       res.json(project);
//     } else {
//       res.status(404).json({ message: 'Project not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ------------------------------------------


// // Update project (title/description/image)
// // router.put("/:id", upload.single("image"), async (req, res) => {
// //   try {
// //     const project = await Project.findById(req.params.id);
// //     if (!project) return res.status(404).json({ message: "Not found" });

// //     // Update text fields
// //     project.title = req.body.title || project.title;
// //     project.description = req.body.description || project.description;

// //     // If image is provided, replace it
// //     if (req.file) {
// //       await cloudinary.uploader.destroy(project.public_id);
// //       project.imageUrl = req.file.path;
// //       project.public_id = req.file.filename;
// //     }

// //     await project.save();
// //     res.json({ success: true, project });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: err.message });
// //   }
// // });





// // -------------------------------------------------------------------------------------------------------------------

// // // import multer from 'multer';
// // import path from 'path';

// // Set up storage for uploaded files
// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, 'uploads/'); // Sawirada waxaa lagu kaydinayaa galka 'uploads/'
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
// //   },
// // });

// // Init upload middleware
// // const upload = multer({ storage: storage });

// // @desc    Add a new project
// // @route   POST /api/projects
// // @access  Public


// // @desc    Get all projects
// // @route   GET /api/projects
// // @access  Public


// // @desc    Update a project
// // @route   PUT /api/projects/:id
// // @access  Public
// // 

// // @desc    Delete a project
// // @route   DELETE /api/projects/:id
// // @access  Public
// // 

// // @desc    Get project by ID
// // @route   GET /api/projects/:id
// // @access  Public
// // const getProjectById = async (req, res) => {
// //   try {
// //     const project = await Project.findById(req.params.id);

// //     if (project) {
// //       res.json(project);
// //     } else {
// //       res.status(404).json({ message: 'Project not found' });
// //     }
// //   } catch (error) {
// //     res.status(500).json({ message: error.message });
// //   }
// // };

// export { addProject, getProjects, updateProject, deleteProject,getProjectById }; 
