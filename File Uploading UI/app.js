var http = require('http');
var fs = require('fs');
var path = require('path');
var express =   require("express");
var multer  =   require('multer');
var bodyParser = require("body-parser");
var app     =   express();

const util = require('util')
var serveIndex = require('serve-index');

app.use(express.static(__dirname + "/"))
app.use('/fileview',
  express.static('/fileuplods'),
  serveIndex(__dirname + '/fileuploads',
    {
      'icons': true,
      'view':'details'
    })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './fileuploads');
  },
  filename: function (req, file, callback) {
    //console.log(file);
    callback(null, file.originalname);
  }
});

var upload = multer({ storage : storage}).single('file');

app.get('/',function(req,res){

  res.sendFile(__dirname + "/index.html");

});

app.post('/api/uploadfile',function(req,res){
  console.log(util.inspect(req.file, false, null, true /* enable colors */))

  upload(req,res,function(err) {

      if(err) {
          console.log(err);
          return res.end(err);
      }
      console.log("NP Fileupload: File is uploaded to /fileuploads folder")
      res.end("File is uploaded to /fileuploads folder");
  });
});
//serves files
app.get('/fileview/:filename', function(req, res){
  console.log(req.params.filename)
  res.sendFile(__dirname + "/fileuploads/"+req.params.filename);
})


app.listen(3335,function(){
  console.log("UI App started on port 3335");
})
