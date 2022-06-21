const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
// var GenerateSchema = require('generate-schema')

const dataschema = new Schema({
    season: {
        type: Number,
        required: true
    },
    seasonType: {
        type: Number,
        required: true
    },
    salaryCap: {
        type: Number,
    },
    slateId: {
        type: Number,
        required: true,
    },
    week: {
        type: Number,
        required: true,
    },
    operator: {
        type: String,
        required: true,
    },
    operatorDay: {
        type: String,
        required: true,
    },
    operatorGameType: {
        type: String,
        required: true,
    },
    operatorName: {
        type: String,
        required: true,
    },
    operatorStartTime: {
        type: String,
        required: true,
    },
    dfsSlatePlayers: [
        {
            operatorPlayerName: String,
            fantasyPoints: Number,
            operatorPosition: String,
            team: String,
            operatorSalary: Number,
        }
    ]
})

module.exports = {
    DataSchema: mongoose.model('fantasy',dataschema),
}