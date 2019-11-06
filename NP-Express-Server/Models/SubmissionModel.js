// Submission schema for monngodb
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Submission = new Schema({
    recordid: {
        type: Number
    },
    researcherid: {
        type: Number
    },
    metadatacollectionId: {
        type: Number
    },
    typeofdata: {
        type: String
    },
    datafrom: {
        type: String
    },
    ispublished: {
        type: Boolean
    },
    reference: {
        type: String
    },
    isembargo :{
        type: Boolean
    },
    releasedate :{
        type: Date
    },
    doi :{
        type: String
    }

}, {
    collection: 'submission'
});

module.exports = mongoose.model('Submission', Submission);