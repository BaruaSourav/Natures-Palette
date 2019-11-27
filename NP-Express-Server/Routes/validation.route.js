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
    var referredFileNameList = [];
    var rawDataFiles = [];

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
          headersMatchWithTemplate = true;
          //res.json({ messages: messages, isValidated: true });
        } else {
          headersMatchWithTemplate = false;
          console.log("NP logs: headers does not match with template");
          messages.push("Metadata headers does not match with template");
          headersMatchWithTemplate = false;
          //res.json({ messages: messages, isValidated: false });
        }
      })
      .on("data", row => {
        referredFileNameList.push(row.FileName);
      })
      .on("end", () => {
        
        // console.log("Referred File Name list :"+referredFileNameList);
        // reading inside the zipped file
        var rawfilepath = path.resolve(
          __dirname,
          "../filepersistance/tempvalidationfiles/" + req.body.rawfilename
        );

        //var zippedRawFile = new AdmZip("D:/Projects/Natures-Palette/NP-Express-Server/filepersistance/tempvalidationfiles/Sandoval 2017 M leucotis.zip");
        var zippedRawFile = new AdmZip(rawfilepath);
        var zipEntries = zippedRawFile.getEntries();
        //console.log(zipEntries);
        zipEntries.forEach(file => {
          let temp = file.entryName.split('/')[1].split('.');
          temp.pop();
          temp.pop();
          console.log(temp.join('.'));
          rawDataFiles.push(temp.join('.'));
          //console.log(rawDataFiles.length);
        });
        rawDataFiles.shift(); //removing first element
        console.log(rawDataFiles.length);
        console.log(referredFileNameList.length);
        console.log("CSV file successfully processed");

        let difference = referredFileNameList.filter(x=> !rawDataFiles.includes(x));
        // let differenceOpp = rawDataFiles.filter(x=> !referredFileNameList.includes(x));
        console.log(difference);
        //console.log(differenceOpp);
        if(difference.length == 0)
          rawFileIsConsistent = true;
        else 
          rawFileIsConsistent = false;
          

      });


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
