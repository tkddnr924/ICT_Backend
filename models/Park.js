const mongoose = require('mongoose')
const Schema = mongoose.Schema

// park
// status: PARK | EMPTY | RESERVE
// park seq
const parkSchema = new Schema({
    status: {
        type: String,
        required: true,
        default: "EMPTY"
    },
    seq: {
        type: String,
        required: true,
        unique: true
    },
    reserve: {
        type: String
    }
})

parkSchema.statics.findParkBySeq = async function (seq) {
    return this.find({ seq: seq }).exec()
}

module.exports = mongoose.model('Park', parkSchema)
