const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function hashExistingPasswords() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  const users = await User.find({});
  for (let user of users) {
    user.password = await bcrypt.hash(user.password, 8);
    await user.save();
  }
  console.log('All passwords hashed');
  
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
}

hashExistingPasswords().catch(console.error);