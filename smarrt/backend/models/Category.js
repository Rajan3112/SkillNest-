const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true,
    maxlength: [50, 'Category name cannot exceed 50 characters'],
  },
  description: {
    type: String,
    default: '',
    maxlength: [200, 'Description cannot exceed 200 characters'],
  },
  icon: {
    type: String,
    default: 'FaBook',
  },
  color: {
    type: String,
    default: '#4F46E5',
  },
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
