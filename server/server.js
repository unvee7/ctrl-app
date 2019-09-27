const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./api');
const mongoose = require('mongoose');
const morgan = require('morgan');
const multer = require('multer');
// const upload = multer();
const app = express();

// MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(function(err, req, res, next){
  res.status(422).send({error: err.message})
}) //error handler for server requests

// app.use(multer());
app.use('/api', routes);
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(function(err, req, res, next) {
  if (err) {
    res.status(422).send({error: err.message})
  }
});

// LISTEN
const port = 2000;
app.listen(process.env.port || port, function() {
  console.log('listening on port: ' + (process.env.port || port))
})



// //HANDLE ERROR REQUESTS
// app.use((req, res, next) => {
//   const error = new Error('Not Found');
//   error.status =  404;
//   next(error);
// })

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message : error.message
//     }
//   })
// })

// CONNECT TO MONGOdb
mongoose.connect('mongodb://localhost/appPhotos', { useNewUrlParser: true });
mongoose.Promise = global.Promise;
