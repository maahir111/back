import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    link: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);













// import mongoose from 'mongoose';

// const projectSchema = mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     link: { type: String, required: true },
//     imageUrl: { type: String, required: false }, // Cloudinary URL
//     public_id: { type: String, required: false }, // Cloudinary public_id
//   },
//   {
//     timestamps: true,
//   }
// );

// const Project = mongoose.model('Project', projectSchema);

// export default Project; 



