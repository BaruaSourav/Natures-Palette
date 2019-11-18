// metadatafile.route.js
const util = require("util");
const express = require("express");
const app = express();
const validationroutes = express.Router();
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");
var AdmZip = require("adm-zip");

var multer = require("multer");

// Validation templates
// Museum Template
var museumTemplateHeaders = [
  "FileName",
  "institutionCode",
  "collectionCode",
  "catalogueNumber",
  "class",
  "order",
  "family",
  "genus",
  "specificEpithet",
  "infraspecificEpithet",
  "sex",
  "lifeStage",
  "country",
  "locality",
  "decimalLatitude",
  "decimalLongitude",
  "geodeticDatum",
  "verbatimElevation",
  "eventDate",
  "measurementDeterminedDate",
  "Patch",
  "LightAngle1",
  "LightAngle2",
  "ProbeAngle1",
  "ProbeAngle2",
  "Replicate",
  "Comments"
];

// Field Template Headers
var fieldTemplateHeaders = [
  "FileName",
  "UniqueID",
  "class",
  "order",
  "family",
  "genus",
  "specificEpithet",
  "infraspecificEpithet",
  "sex",
  "lifeStage",
  "country",
  "locality",
  "decimalLatitude",
  "decimalLongitude",
  "geodeticDatum",
  "verbatimElevation",
  "eventDate",
  "measurementDeterminedDate",
  "Patch",
  "LightAngle1",
  "LightAngle2",
  "ProbeAngle1",
  "ProbeAngle2",
  "Replicate",
  "Comments"
];

upload = multer();
// Defining validation route for metadata file
validationroutes
  .route("/primaryvalidation")
  .post(upload.none(), function(req, res) {
    var headersMatchWithTemplate = false;
    var rawFileIsConsistent = false;
    var messages = [];
    // checking for the header name match validation
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
        if (JSON.stringify(headers) == JSON.stringify(museumTemplateHeaders)) {
          headersMatchWithTemplate = true;
          messages.push("Metadata headers validated against templates");
          console.log(messages);
          console.log("NP logs: headers matches with template");
          res.json({ 'messages' : messages, 'isValidated': true });
        } else {
          headersMatchWithTemplate = false;
          console.log("NP logs: headers does not match with template");
          messages.push("Metadata headers does not match with template");
          res.json({ 'messages' : messages , 'isValidated': false});
        }
      })
      .on("data", row => {})
      .on("end", () => {
        console.log("CSV file successfully processed");
      });

    // unzipping the zipped file
    var rawfilepath = path.resolve(
      __dirname,
      "../filepersistance/tempvalidationfiles/" + req.body.rawfilename
    );
    //

    console.log(
      "NP RawFile Route Message: File is uploaded to /filepersistance/tempvalidationfile folder"
    );
    // res.end("Respone from primary validation");
    
  
    
  });

// Defined get data(index or listing) route
validationroutes.route("/").get(function(req, res) {
  res.json("validation route works perfectly");
});

module.exports = validationroutes;
