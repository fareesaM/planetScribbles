// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import bcrypt from 'bcryptjs';
// import User from './models/userModel.js'; // correct path to your user model

// dotenv.config();

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('✅ MongoDB Connected');
//   } catch (error) {
//     console.error(error.message);
//     process.exit(1);
//   }
// };

// const createAdmin = async () => {
//   const exists = await User.findOne({ email: 'admin@example.com' });
//   if (exists) {
//     console.log('⚠️ Admin already exists');
//     process.exit();
//   }

//   const hashedPassword = await bcrypt.hash('123456', 10);

//   const admin = new User({
//     name: 'Admin User',
//     email: 'admin@example.com',
//     password: hashedPassword,
//     isAdmin: true,
//   });

//   await admin.save();
//   console.log('✅ Admin created: admin@example.com / 123456');
//   process.exit();
// };

// connectDB().then(createAdmin);

// testPassword.js

import bcrypt from 'bcryptjs';

const runTest = async () => {
  const enteredPassword = '123456';  // this is what the user would type
  const hashedPasswordFromDB = '$2b$10$WvBq.RIz1qKZFDXUvni1mu/PZJ9XNqAiY82BgiQ3zz7klK8vPCwAC';  // copied from user in DB

  const isMatch = await bcrypt.compare(enteredPassword, hashedPasswordFromDB);
  console.log("Password match:", isMatch);
};

runTest();
