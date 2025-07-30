import mongoose from 'mongoose';
import User from './models/User.js';

const MONGO_URI = 'mongodb+srv://garaad:%401212@graadtech01.4mbdblf.mongodb.net/portfolioDB?retryWrites=true&w=majority';

const seedAdminUser = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected for seeding!');

    const adminExists = await User.findOne({ username: 'Graad@admi' });

    if (adminExists) {
      console.log('Admin user already exists.');
      mongoose.disconnect();
      return;
    }

    const adminUser = new User({
      username: 'Graad@admi',
      password: hashedPassword,
    });

    await adminUser.save();
    console.log('Admin user created successfully!');
    mongoose.disconnect();
  } catch (error) {
    console.error(`Error seeding admin user: ${error.message}`);
    mongoose.disconnect();
    process.exit(1);
  }
};

seedAdminUser(); 