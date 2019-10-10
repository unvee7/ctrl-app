const express = require('express');
const router = express.Router();
const Photo = require('../database/models/photo'); // require this schema to create instance of Photo to use in our post method
const mongoose = require('mongoose');
const multer = require('multer');
const morgan = require('morgan');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({storage: storage});

const defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10,
};

// GET ALL
router.get('/all', (req, res, next) => {
  Photo.find()
  .select('file tags createdBy')
  .exec()
  .then( files => {
    // console.log(files);
    const response = {
      count: files.length,
      photos: files.map( file => {
        return {
          file: `./uploads/` + file.file,
          tags: file.tags,
          createdBy: file.createdBy,
          request: {
            type: 'GET',
            url: 'http//:localhost:2000/api/all' + file._id
          }
        }
      })
    }
    // console.log('uploaded Files: ' + file);
    res.status(200).json(response);
  })
  .catch( err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  })
})

//GET ONE
router.get('/:photoId', function (req, res) {
  const id = req.params.photoId;
  Photo.findById(id)
  .exec()
  .then( file => {
    if (file) {
      res.status(200).json(file);
    } else {
      res.status(500).json({
        message: 'no valid entry for id provided'
      })
    }
    console.log('uploaded file: ' + file)
  })
  .catch( err => console.log(err))
})

//ADD one
router.post('/newOne', upload.single('file'), (req, res, next) => {
  const newPhoto = new Photo ( {
    file: req.file.filename,
    tags: req.body.tags.split(',').map((word) => word.trim()),
    // tags: req.body.tags.split(','),
    createdBy: req.body.createdBy,
    dateAdded: new Date(),
    views: 0,
    downloads: 0
  })
  newPhoto.save()
  .then( result => {
    console.log('saved Mongoos entry: ' + result);
    // console.dir(req.body)
  })
  .catch( err => {
    console.log(err)
  })
  res.status(201).json({
    message: 'New photo added! Yay!',
    post: newPhoto
  })
})

//UPDATE one
router.put('/all/:id', function(req, res) {
  res.send({type: 'PUT'})
})

//DELETE ALL
router.delete('/all', function(req, res) {
  res.set(defaultCorsHeaders);
  Photo.find().deleteMany().exec();
  res.status(200).send('ALL ENTRIES DELETED!');
})

router.delete('/:id', function(req, res) {
  // res.send({type: 'DELETE'})
  const id = req.params.id;
  Photo.remove({_id: id})
  .exec()
  .then(result => {
    res.status(200).json(result)
  })
  .catch( err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  })
})

module.exports = router;
// export default router;