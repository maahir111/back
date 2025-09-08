import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// ✅ KU DAR: Password Hashing Middleware (VERY IMPORTANT)
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  try {
    // Hash the password with salt rounds = 10
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model('User', userSchema);



// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema(
//   {
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     isAdmin: { type: Boolean, default: false }, // 🔑 admin flag
//   },
//   { timestamps: true }
// );

// export default mongoose.model('User', userSchema);
