// metadatafile.route.js
const util = require('util')
const express = require('express');
const app = express();
const metadataroutes = express.Router();

var multer = require('multer');


// MetadataFileModel 
let MetadataFileModel = require('../Models/MetadataFileModel');

// configuring multer middleware
// metadata storage directory
var metadatafilestorage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './filepersistance/metadatafiles');
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


var validationdirectorymiddleware = multer({ storage : validationstorage}).single('metadatafile');
var metadatafiledirectorymiddleware = multer({ storage : metadatafilestorage}).single('metadatafile');
// Defining validation route for metadata file
metadataroutes.route('/validate').post(function(req,res){
  console.log(util.inspect(req.file, false, null, true))
  // 
  validationdirectorymiddleware(req,res,function(err) {

      if(err) {
          console.log(err);
          return res.end(err);
      }
      console.log("NP MetadataRoute Message: File is uploaded to /filepersistance/tempvalidationfiles folder")
      res.end("NP MetadataRoute Message: File is uploaded to /filepersistance/tempvalidationfiles folder");
  });
});




// Defined store route for metadatafile
metadataroutes.route('/add').post(function (req, res) {
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
metadataroutes.route('/').get(function (req, res) {
  MetadataFileModel.find(function (err, metadatainformationlist) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(metadatainformationlist);
    }
  });
});

// // Defined edit route
// metadataroutes.route('/edit/:id').get(function (req, res) {
//   let id = req.params.id;
//   Business.findById(id, function (err, business){
//       res.json(business);
//   });
// });

// //  Defined update route
// metadataroutes.route('/update/:id').post(function (req, res) {
//     Business.findById(req.params.id, function(err, next, business) {
//     if (!business)
//       return next(new Error('Could not load Document'));
//     else {
//         business.person_name = req.body.person_name;
//         business.business_name = req.body.business_name;
//         business.business_gst_number = req.body.business_gst_number;

//         business.save().then(business => {
//           res.json('Update complete');
//       })
//       .catch(err => {
//             res.status(400).send("unable to update the database");
//       });
//     }
//   });
// });

// // Defined delete | remove | destroy route
// metadataroutes.route('/delete/:id').get(function (req, res) {
//     Business.findByIdAndRemove({_id: req.params.id}, function(err, business){
//         if(err) res.json(err);
//         else res.json('Successfully removed');
//     });
// });

module.exports = metadataroutes;