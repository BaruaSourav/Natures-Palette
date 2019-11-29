// search.route.js
const express = require("express");
const app = express();
const downloadroutes = express.Router();
var multer = require("multer");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const fastcsv = require("fast-csv");

const upload = multer();

const ws = fs.createWriteStream(
  path.resolve(__dirname, "../filepersistance/tempDownloadFiles/metadata.csv")
);

downloadroutes.route("/").post(upload.none(), function(req, res) {
  var metadataInformationList = req.body;
  var tempList = [];
  console.log(metadataInformationList);
  metadataInformationList.forEach(row => {
    delete row._id;
    delete row.__v;
    //console.log(row);
    tempList.push(row);
  });
  //console.log(tempList);
  fastcsv.write(tempList, { headers: true }).pipe(ws);
  ws.close();
  
});

module.exports = downloadroutes;
