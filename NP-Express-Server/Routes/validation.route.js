// metadatafile.route.js
const util = require("util");
const express = require("express");
const app = express();
const validationroutes = express.Router();
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");

var multer = require("multer");
// Validation templates 
// Museum Template 
var museumTemplateHeaders = [
  'FileName',
  'institutionCode',
  'collectionCode',
  'catalogueNumber',
  'class',
  'order',
  'family',
  'genus',
  'specificEpithet',
  'infraspecificEpithet',
  'sex',
  'lifeStage',
  'country',
  'locality',
  'decimalLatitude',
  'decimalLongitude',
  'geodeticDatum',
  'verbatimElevation',
  'eventDate',
  'measurementDeterminedDate',
  'Patch',
  'LightAngle1',
  'LightAngle2',
  'ProbeAngle1',
  'ProbeAngle2',
  'Replicate',
  'Comments'

]

// Field Template 
var fieldTemplateHeaders = [
  'FileName',
  'UniqueID',
  'class',
  'order',
  'family',
  'genus',
  'specificEpithet',
  'infraspecificEpithet',
  'sex',
  'lifeStage',
  'country',
  'locality',
  'decimalLatitude',
  'decimalLongitude',
  'geodeticDatum',
  'verbatimElevation',
  'eventDate',
  'measurementDeterminedDate',
  'Patch',
  'LightAngle1',
  'LightAngle2',
  'ProbeAngle1',
  'ProbeAngle2',
  'Replicate',
  'Comments'

]

upload = multer();
// Defining validation route for metadata file
validationroutes
  .route("/primaryvalidation")
  .post(upload.none(), function(req, res) {
    //console.log(util.inspect(req.file, false, null, true));
    fs.createReadStream(
      path.resolve(
        __dirname,
        "../filepersistance/tempvalidationfiles/" + req.body.metadatafilename
      )
    )
      .pipe(csv())
      .on("headers", headers => {
        console.log(`all headers: ${headers}`);
      })
      .on("data", row => {
        //console.log(row);
      })
      .on("end", () => {
        console.log("CSV file successfully processed");
      });

    if (err) {
      console.log(err);
      return res.end(err);
    }
    console.log(
      "NP RawFile Route Message: File is uploaded to /filepersistance/tempvalidationfile folder"
    );
    res.end(
      "NP RawFile Message: File is uploaded to /filepersistance/tempvalidationfile folder"
    );
  });

// Defined get data(index or listing) route
validationroutes.route("/").get(function(req, res) {
  res.json("validation route works perfectly");
});

module.exports = validationroutes;
