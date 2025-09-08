import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    title: { type: String, default: "", trim: true },
    message: { type: String, required: true },
    image: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);


















// import mongoose from 'mongoose';

// const testimonialSchema = mongoose.Schema(
//   {
//     fullName: {
//       type: String,
//       required: true,
//     },
//     subject: {
//       type: String,
//       required: true,
//     },
//     text: {
//       type: String,
//       required: true,
//     },
//     rating: {
//       type: Number,
//       required: true,
//     },
//     image: {
//       type: String, // Mark for potential file upload handling later
//       required: false,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Testimonial = mongoose.model('Testimonial', testimonialSchema);

// export default Testimonial; 