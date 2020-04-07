const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./api');
const mongoose = require('mongoose');
const morgan = require('morgan');
const formidable = require('formidable'); // need this to access formData on res
const app = express();

// MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(function(err, req, res, next){
  res.status(422).send({error: err.message})
}) //error handler for server requests

app.use('/api', routes);
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.use(function(err, req, res, next) {
  if (err) {
    // req.body = {}
    res.status(422).send({error: err.message})
    // console.log(err)
  }
});
// LISTEN
const port = 2000;
app.listen(process.env.port || port, function() {
  console.log('listening on port: ' + (process.env.port || port))
})

// CONNECT TO MONGOdb
mongoose.connect('mongodb://localhost/appPhotos', { useNewUrlParser: true });
mongoose.Promise = global.Promise;
