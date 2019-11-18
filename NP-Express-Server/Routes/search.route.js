// search.route.js
const express = require('express');
const app = express();
const searchroutes = express.Router();
var multer = require('multer');
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

//MetadatainfoModel 
let MetadataInfoModel = require('../Models/MetadataInformationModel');
const upload = multer();
// Defined store route for submission information
searchroutes.route('/').post(upload.none(), function (req, res) {
  let query = req.body;
  submission.save()
    .then(submission => {
      res.status(200).json(
        {
          'Success': 'The submission stored successfully',
          'body': req.body
        }
      );
    })
    .catch(err => {
      res.status(400).send("Unable to save to database");
    });
});

module.exports = submissionroutes;