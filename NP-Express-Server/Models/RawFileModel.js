// Rawfile information schema for monngodb
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RawFile = new Schema(
    {
        fileId: {
            type: Number
        },
        name: {
            type: String
        },
        type: {
            type: String
        },
        path: {
            type: String
        },
        uploadDate: {
            type: Date
        }
    },
    {
        collection: 'rawfile'
    }
);

module.exports = mongoose.model('RawFile', RawFile);
