const mongoose = require('mongoose')
const moment = require('moment')

const Schema = mongoose.Schema

const { defaultTimeFormat } = require('../utils/time_format')


// car
// time
// type: INPUT | OUTPUT
// park number
const carSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    park_num: {
        type: Schema.Types.ObjectId,
        ref: 'Park'
    },
    time: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Car', carSchema)
