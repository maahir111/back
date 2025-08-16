// // import multer from 'multer';
// import path from 'path';

// Set up storage for uploaded files
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Sawirada waxaa lagu kaydinayaa galka 'uploads/'
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
//   },
// });

// Init upload middleware
// const upload = multer({ storage: storage });

// @desc    Add a new project
// @route   POST /api/projects
// @access  Public
const addProject = async (req, res) => {
  try {
    const { title, description, link } = req.body;

    // Cloudinary URL waxaa lagu heli doonaa req.file.path
    const image = req.file ? req.file.path : "";

    const newProject = new Project({
      title,
      description,
      link,
      image,
    });

    const createdProject = await newProject.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({});
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Public
const updateProject = async (req, res) => {
  try {
    const { title, description, link } = req.body;

    // default: haddii image la soo dirin, isticmaal kii hore
    let image = req.body.image;

    // haddii image cusub la upload gareeyay → Cloudinary URL
    if (req.file) {
      image = req.file.path;
    }

    const project = await Project.findById(req.params.id);

    if (project) {
      project.title = title || project.title;
      project.description = description || project.description;
      project.link = link || project.link;
      project.image = image || project.image;

      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Public
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      await project.deleteOne();
      res.json({ message: 'Project removed' });
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get project by ID
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { addProject, getProjects, updateProject, deleteProject, getProjectById }; 