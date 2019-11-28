// search.route.js
const express = require("express");
const app = express();
const downloadroutes = express.Router();
var multer = require("multer");
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const upload = multer();
downloadroutes.route("/").post(upload.none(), function(req, res) {
  

  var obj = req.body;
  console.log(obj);
  // MetadataInfoModel.find(obj, function(err, result) {
  //   if (err) throw err;
  //   console.log(result);
  //   res.json(result);
  // });
});

module.exports = downloadroutes;
