// Submission.route.js
const express = require("express");
const app = express();
const submissionroutes = express.Router();
var multer = require("multer");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
var AdmZip = require("adm-zip");

// Submission Model
let SubmissionModel = require("../Models/SubmissionModel");
let MetadataInfoModel = require("../Models/MetadataInformationModel");

var upload = multer();
// Defined store route for submission information
submissionroutes.route("/add").post(upload.none(), function(req, res) {
  // moving metadata files from temp to metadatafiles folder
  let tempmetadatapath = path.resolve(
    __dirname,
    "../filepersistance/tempvalidationfiles/" + req.body.MetaDataFileName
  );
  let metadatapath = path.resolve(
    __dirname,
    "../filepersistance/metadatafiles/" + req.body.MetaDataFileName
  );
  let moveMetadataFileCallback = function(e) {
    console.log(e);
  };
  fs.rename(tempmetadatapath, metadatapath, moveMetadataFileCallback);
  ///////////////////////////////////////////////////////////////////////////
  // moving rawfile from temp to metadatafiles folder
  let temprawfilepath = path.resolve(
    __dirname,
    "../filepersistance/tempvalidationfiles/" + req.body.RawFileName
  );
  let rawfilepath = path.resolve(
    __dirname,
    "../filepersistance/rawfiles/" + req.body.RawFileName
  );
  let moveRawFileCallback = function(e) {
    let rawFileDirectory = path.resolve(
      __dirname,
      "../filepersistance/rawfiles/"
    );
    var zippedRawFile = new AdmZip(rawfilepath);
    var zipEntries = zippedRawFile.getEntries();
    zipEntries.shift();
    zipEntries.forEach(entry => {
      zippedRawFile.extractEntryTo(entry.entryName, rawFileDirectory, false, true);
    });
    fs.unlink(rawfilepath);
    //zippedRawFile.extractAllTo(rawFileDirectory,true);

  };
  fs.rename(temprawfilepath, rawfilepath, moveRawFileCallback);
  // TODO: Need to unzip the raw file here

  

  //  Reading metadata csv file's rows
  fs.createReadStream(metadatapath)
    .pipe(csv())
    .on("data", row => {
      let metadatainfo = new MetadataInfoModel(row);
      //console.log(metadatainfo);
      metadatainfo
        .save()
        .then(metadatainfo => {
          //console.log(metadatainfo);
        })
        .catch(err => {
          console.log(err);
        });
    });

  let submission = new SubmissionModel(req.body);
  submission
    .save()
    .then(submission => {
      res.status(200).json({
        Success: "The submission stored successfully",
        body: req.body
      });
    })
    .catch(err => {
      res.status(400).send("Unable to save to database");
    });
});

// Defined get data(index or listing) route
submissionroutes.route("/").get(function(req, res) {
  SubmissionModel.find(function(err, submissions) {
    if (err) {
      console.log(err);
    } else {
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

module.exports = submissionroutes;
