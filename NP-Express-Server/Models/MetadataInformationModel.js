// Metadata information schema for monngodb
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MetadataInformation = new Schema(
    {
        metadataCollectionId: {
            type: Number
        },
        recordID: {
            type: String
        },
        fileID: {
            type: Number
        },
        institutionCode: {
            type: Number
        },
        collectionCode: {
            type: Number
        },
        catalogueNumber: {
            type: Number
        },
        class: {
            type: String
        },
        order: {
            type: String
        },
        family: {
            type: String
        },
        genus: {
            type: String
        },
        specificEpithet: {
            type: String
        },
        infraspecificEpithet: {
            type: String
        },
        sex: {
            type: String
        },
        lifeStage: {
            type: String
        },
        country: {
            type: String
        },
        locality: {
            type: String
        },
        decimalLatitude: {
            type: Number
        },
        decimalLongitude: {
            type: Number
        },
        geodeticDatum: {
            type: String
        },
        verbatimElevation: {
            type: String
        },
        eventDate: {
            type: Date
        },
        measurementDeterminedDate: {
            type: Date
        },
        Patch: {
            type: String
        },
        LightAngle1: {
            type: Number
        },
        LightAngle2: {
            type: Number
        },
        ProbeAngle1: {
            type: Number
        },
        ProbeAngle2: {
            type: Number
        },
        Replicate: {
            type: Number
        },
        Comments: {
            type: String
        }
    },
    {
        collection: 'metadatafile'
    }
);

module.exports = mongoose.model('MetadataInformation', MetadataInformation);
