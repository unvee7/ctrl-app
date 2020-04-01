const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  file: {
    type: Buffer,
    required: [true, 'file is required']
  },
  tags: [],
  createdBy: {
    type: String,
    required: [true, 'Who created this post?']
  },
  dateAdded: {
    type: String,
    required: [true, 'User is required']
  },
  views: {
    type: Number
  },
  downloads: {
    type: Number
  }
});

const Photo = mongoose.model('Photo', PhotoSchema);

module.exports = Photo;