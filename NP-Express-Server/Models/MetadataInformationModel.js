// Submission schema for monngodb
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MetadataInformation = new Schema({
  metadataCollectionId: {
    type: Number
  },
  recordID:{
    type: String
  }

},
  {
    collection: 'metadatafile'
  }
);

module.exports = mongoose.model('MetadataInformation', MetadataInformation);
