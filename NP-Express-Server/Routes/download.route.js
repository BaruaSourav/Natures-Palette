// search.route.js
const express = require("express");
const app = express();
const downloadroutes = express.Router();
var multer = require("multer");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const fastcsv = require("fast-csv");
var AdmZip = require("adm-zip");

const upload = multer();

downloadroutes.route("/").post(upload.none(), function(req, res) {
  const ws = fs.createWriteStream(
    path.resolve(__dirname, "../filepersistance/tempDownloadFiles/metadata.csv")
  );
  const downloadFilesDir = path.resolve(
    __dirname,
    "../filepersistance/tempDownloadFiles/"
  );
  const rawFileDir = path.resolve(__dirname, "../filepersistance/rawfiles/");

  var rawFileZip = new AdmZip();
  var metadataInformationList = req.body;
  var tempList = [];
  //console.log(metadataInformationList);
  metadataInformationList.forEach(row => {
    delete row._id;
    delete row.__v;
    rawFileZip.addLocalFile(
      path.resolve(rawFileDir + "/" + row.FileName + ".Master.Transmission")
    );
    //console.log(row);
    tempList.push(row);
  });
  // fastcsv.write(tempList, { headers: true }).pipe(ws);
  fastcsv.writeToPath(
    path.resolve(
      __dirname,
      "../filepersistance/tempDownloadFiles/metadata.csv"
    ),
    tempList,
    { headers: true }
  );
  rawFileZip.writeZip(path.resolve(downloadFilesDir + "/rawfiles.zip"));
  var finalPackageZip = new AdmZip();
  finalPackageZip.addLocalFile(
    path.resolve(downloadFilesDir + "/" + "metadata.csv")
  );
  finalPackageZip.addLocalFile(
    path.resolve(downloadFilesDir + "/" + "rawfiles.zip")
  );
  finalPackageZip.writeZip(path.resolve(downloadFilesDir + "/NPDownloadPackage.zip"));
  //conso
  //console.log(tempList);
  //ws.close();
  //var downloadPackage = fs.readFileSync(path.resolve(downloadFilesDir + '/rawfiles.zip'), 'binary');

  // res.download(
  //   path.resolve(downloadFilesDir + "/NPDownloadPackage.zip"),
  //   "NPDownloadPackage.zip"
  // );
  res.json({status:'success'});
});

module.exports = downloadroutes;
