// metadatafile.route.js
const util = require('util')
const express = require('express');
const app = express();
const rawfileroutes = express.Router();

var multer = require('multer');


// RawFileModel 
let RawFileModel = require('../Models/RawFileModel');

// configuring multer middleware
// metadata storage directory
var rawfilestorage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './filepersistance/rawfiles');
  },
  filename: function (req, file, callback) {
    //console.log(file);
    callback(null, file.originalname);
  }
});
//validation storage directory
var validationstorage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './filepersistance/tempvalidationfiles');
  },
  filename: function (req, file, callback) {
    //console.log(file);
    callback(null, file.originalname);
  }
});


var validationdirectorymiddleware = multer({ storage : validationstorage}).single('rawfile');
var rawfiledirectorymiddleware = multer({ storage : rawfilestorage}).single('rawfile');
// Defining validation route for metadata file
rawfileroutes.route('/validate').post(function(req,res){
  console.log(util.inspect(req.file, false, null, true))
  // 
  validationdirectorymiddleware(req,res,function(err) {

      if(err) {
          console.log(err);
          return res.end(err);
      }
      console.log("NP RawFile Route Message: File is uploaded to /filepersistance/tempvalidationfiles folder")
      res.end("NP RawFile Message: File is uploaded to /filepersistance/tempvalidationfiles folder");
  });
});




// Defined store route for metadatafile
rawfileroutes.route('/add').post(function (req, res) {
  let submission = new SubmissionModel(req.body);
  submission.save()
    .then(submission => {
      res.status(200).json(
        {
          'Success': 'The RawfileInformation stored successfully',
          'body': req.body
        }
      );
    })
    .catch(err => {
      res.status(400).send("Unable to save to database");
    });
});

// Defined get data(index or listing) route
rawfileroutes.route('/').get(function (req, res) {
  MetadataFileModel.find(function (err, metadatainformationlist) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(metadatainformationlist);
    }
  });
});



module.exports = rawfileroutes;