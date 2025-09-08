// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// ================================
// User Schema
// ================================
const userSchema = new mongoose.Schema(
  {
    username: { 
      type: String, 
      required: [true, "Username is required"], 
      unique: true, 
      trim: true 
    },
    password: { 
      type: String, 
      required: [true, "Password is required"] 
    },
    isAdmin: { 
      type: Boolean, 
      default: false 
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt automatically
);

// ================================
// Password Hashing Middleware
// ================================
userSchema.pre('save', async function(next) {
  // Only hash password if it's new or modified
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10); // Salt rounds
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// ================================
// Password Verification Method
// ================================
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// ================================
// Export User Model
// ================================
const User = mongoose.model('User', userSchema);
export default User;




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
