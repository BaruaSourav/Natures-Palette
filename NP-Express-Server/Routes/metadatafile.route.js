// metadatafile.route.js
const express = require('express');
const app = express();
const metadataroutes = express.Router();

var multer = require('multer');


// MetadataFileModel 
let MetadataFileModel = require('../Models/MetadataFileModel');

var upload = multer({ storage : storage}).single('file');
// Defining validation route for metadata file



// Defined store route for metadatafile
metadataroutes.route('/add').post(upload.none(), function (req, res) {
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
  MetadataFileModel.find(function (err, submissions) {
    if (err) {
      console.log(err);
    }
    else {
      res.json(submissions);
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

module.exports = submissionroutes;