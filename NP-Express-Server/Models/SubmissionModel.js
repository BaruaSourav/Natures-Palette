// Submission schema for monngodb
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SubmissionSchema = new Schema({
    recordId: {
        type: Number
    },
    researcherId: {
        type: Number
    },
    metadataCollectionId: {
        type: Number
    },
    TypeOfData: {
        type: String
    },
    dataFrom: {
        type: String
    },
    isPublished: {
        type: Boolean
    },
    reference: {
        type: String
    },
    isEmbargo :{
        type: Boolean
    },
    EmbargoDate :{
        type: Date
    },
    Doi :{
        type: String
    },
    Name :{
        type: String
    },
    Email :{
        type: String
    }

}, {
    collection: 'submission'
});

module.exports = mongoose.model('Submission', SubmissionSchema);