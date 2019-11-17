// metadatafile.route.js
const util = require("util");
const express = require("express");
const app = express();
const validationroutes = express.Router();
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
var AdmZip = require('adm-zip');


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

// Field Template Headers
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
    var headersMatchWithTemplate = false;
    var rawFileIsConsistent = false;
    fs.createReadStream(
      path.resolve(
        __dirname,
        "../filepersistance/tempvalidationfiles/" + req.body.metadatafilename
      )
    )
      .pipe(csv())
      .on("headers", headers => {
        console.log(`all headers: ${headers}`);
        // checking if the column name matches with the supplied template
        // TODO: need to implement separate checking flow for the field data template
        if(JSON.stringify(headers)==JSON.stringify(museumTemplateHeaders)){
            headersMatchWithTemplate = true;
            console.log("NP logs: headers matches with template");
        }
        else{
          headersMatchWithTemplate = false;
          console.log("NP logs: headers does not match with template");

        }
      })
      .on("data", row => {
        
      })
      .on("end", () => {
        console.log("CSV file successfully processed");
      });

    if (err) {
      console.log(err);
      return res.end(err);
    }
    console.log("NP RawFile Route Message: File is uploaded to /filepersistance/tempvalidationfile folder");


    res.end(
      "NP RawFile Message: File is uploaded to /filepersistance/tempvalidationfile folder"
    );
  });

// Defined get data(index or listing) route
validationroutes.route("/").get(function(req, res) {
  res.json("validation route works perfectly");
});





module.exports = validationroutes;
