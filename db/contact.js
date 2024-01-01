const mongoose = require('mongoose');

mongoose.set('strict', true);

const connectSchema = new mongoose.Schema({
    Firstname: {
    type: String,
    required: true,
    trim: true,
  },
  Lastname: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (value) => /\S+@\S+\.\S+/.test(value),
      message: 'Invalid email format',
    },
  },

  Streetaddress: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  Postalcode: {
    type: String,
    required: true,
  }, 
  Massage: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('contact', connectSchema);
