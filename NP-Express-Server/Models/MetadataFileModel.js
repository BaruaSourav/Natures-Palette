// Submission schema for monngodb
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MetadataFile = new Schema({
  metadataFileId: {
    type: Number
  },
  name:{
    type: String
  }

},
  {
    collection: 'metadatafile'
  }
);

module.exports = mongoose.model('MetadataFile', MetadataFile);
