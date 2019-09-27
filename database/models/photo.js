const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  file: {
    type: String,
    required: [true, 'file is required']
  },
  // file: {
  //   data: Buffer,
  //   contentType: String,
  //   required: [true, 'Name is required']
  // },
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