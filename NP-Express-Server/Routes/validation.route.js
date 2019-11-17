// metadatafile.route.js
const util = require('util')
const express = require('express');
const app = express();
const validationroutes = express.Router();

var multer = require('multer');

upload =  multer();
// Defining validation route for metadata file
rawfileroutes.route('/primaryvalidation').post(upload.none(), function(req,res){
  console.log(util.inspect(req.file, false, null, true))

      if(err) {
          console.log(err);
          return res.end(err);
      }
      console.log("NP RawFile Route Message: File is uploaded to /filepersistance/tempvalidationfile folder")
      res.end("NP RawFile Message: File is uploaded to /filepersistance/tempvalidationfile folder");
  
});


// Defined get data(index or listing) route
validationroutes.route('/').get(function (req, res) {
  MetadataFileModel.find(function (err, metadatainformationlist) {
    if (err) {
      console.log(err);
    }
    else {
      res.json("validation routeworks perfectly")
    }
  });
});



module.exports = validationroutes;