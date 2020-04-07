const express = require('express');
const router = express.Router();
const Photo = require('../database/models/photo'); // require this schema to create instance of Photo to use in our post method
const mongoose = require('mongoose');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable'); // need this to access formData on res
const grid = require("gridfs-stream"); // used to save images/video files to db
const MongoDb = require('mongodb');


const defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10,
};

// GET ALL
router.get('/all/:numPhotos', (req, res, next) => {
  let numPhotos = Number(req.params.numPhotos);
  console.log(numPhotos)
  Photo.find().skip(numPhotos).limit(20)
  .select('name file tags createdBy')
  .exec()
  .then( files => {
    // solutions was to send the buffer straight to the client as a base64 string. used in brick
    const response = {
      count: files.length,
      photos: files.map( file => {
        return   {
          name: file.name,
          file:  Buffer.from(file.file).toString('base64'),
          tags: file.tags,
          createdBy: file.createdBy,
          request: {
            type: 'GET',
            url: 'http//:localhost:2000/api/all' + file._id
          }
        }
      })
    }
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

//POST
router.post('/newOne', (req, res, next) => {
  const fOpts = {
    maxFileSize: 200 * 1024 * 1024,
    // uploadDir: './uploads', uncomment this line if you want to save locally in a filder called uploads =)
    keepExtensions: true,
    multiples: true // req.files to be arrays of files
  };

  const form = formidable(fOpts);

  form.on ('fileBegin', function(name, file){
    //rename the incoming file to the file's name
    file.path = form.uploadDir + "/" + file.name;
  })

  .on('file', function(field, file) {
  //On file received
  })

  .on('progress', function(bytesReceived, bytesExpected) {
  //self.emit('progess', bytesReceived, bytesExpected)
  // var percent = (bytesReceived / bytesExpected * 100) | 0;
  // process.stdout.write('Uploading: %' + percent + '\r');
  })

  .parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      console.log(err);
      return
    }
    // const fs = require('fs');
    console.log({ fields, files })
    // console.log(files)

    const newPhoto = new Photo ( {
      tags: fields.tags.split(',').map((word) => word.trim()),
      name: fields.name,
      createdBy: fields.createdBy,
      dateAdded: new Date(),
      views: 0,
      downloads: 0
    })

    let data = fs.readFileSync(files.file.path);
    // newPhoto.file.contentType = 'image/jpg';
    newPhoto.file = new MongoDb.Binary(data);

    newPhoto.save()
    .then( result => {
      // console.log('saved Mongoos entry: ' + result);
      // console.dir(req.body)
    })
    .catch( err => {
      console.log(err)
    })
    res.status(201).json({
      message: 'New photo added! Yay!',
      data: files
    })
  })

  .on('end', function() {
    //
  });
})



router.post('/newPhotos', (req, res, next) => {
  const fOpts = {
    maxFileSize: 300 * 1024 * 1024,
    // uploadDir: './uploads', uncomment this line if you want to save locally in a filder called uploads =)
    keepExtensions: true,
    multiples: true // req.files to be arrays of files
  };
  const form = formidable(fOpts);

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      console.log(err);
      return
    }
    console.log(files.photoList.length);

    for (let i = 0; i < files.photoList.length; i++) {
      console.log('in loop');

      let photoFile = files.photoList[i];
      // console.log(photoFile);
      const newPhoto = new Photo ( {
      tags: fields.tags.split(',').map((word) => word.trim()),
      name: photoFile.name,
      createdBy: fields.createdBy,
      dateAdded: new Date(),
      views: 0,
      downloads: 0
      })

      let data = fs.readFileSync(photoFile.path);
      // newPhoto.file.contentType = 'image/jpg';
      newPhoto.file = new MongoDb.Binary(data);

      newPhoto.save()
      .then( result => {
        // console.log('saved Mongoos entry: ' + result);
        // console.dir(req.body)
      })
      .catch( err => {
        console.log(err)
      })
    }
  })

  .on('end', function(fields, files) {
    //
      res.status(201).json({
        message: 'New photo added! Yay!',
        data: files
      })
  });
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