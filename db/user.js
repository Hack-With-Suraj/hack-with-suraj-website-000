const mongoose = require('mongoose');
const env = require('dotenv')

env.config({path:'../config.env'})

mongoose.set('strict', true);

// MongoDB connection using promise
mongoose.connect(process.env.DB)
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err);
  });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  fullName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => /\S+@\S+\.\S+/.test(value),
      message: 'Invalid email format',
    },
  },
  password: { type: String, required: true },
  phoneNo: { type: Number, required: true },
 
  address: {
    type: String, default: "Address is Not Given",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
