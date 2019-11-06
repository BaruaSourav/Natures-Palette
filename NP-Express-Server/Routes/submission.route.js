// Submission.route.js
const express = require('express');
const app = express();
const submissionroutes = express.Router();

// Require Submission model in our routes module
let SubmissionModel = require('../Models/SubmissionModel');

// Defined store route
submissionroutes.route('/add').post(function (req, res) {
  let submission = new SubmissionModel(req.body);
  submission.save()
    .then(submission => {
      res.status(200).json({'Success': 'The submission stored successfully'});
    })
    .catch(err => {
    res.status(400).send("Unable to save to database");
    });
});

// Defined get data(index or listing) route
submissionroutes.route('/').get(function (req, res) {
    SubmissionModel.find(function (err, submissions){
    if(err){
      console.log(err);
    }
    else {
      res.json(submissions);
    }
  });
});

// // Defined edit route
// businessRoutes.route('/edit/:id').get(function (req, res) {
//   let id = req.params.id;
//   Business.findById(id, function (err, business){
//       res.json(business);
//   });
// });

// //  Defined update route
// businessRoutes.route('/update/:id').post(function (req, res) {
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
// businessRoutes.route('/delete/:id').get(function (req, res) {
//     Business.findByIdAndRemove({_id: req.params.id}, function(err, business){
//         if(err) res.json(err);
//         else res.json('Successfully removed');
//     });
// });

module.exports = businessRoutes;