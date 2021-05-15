const ParkModel = require('../models/Park')

class ParkHelper {

    async change_park_type (status, seq) {
        return await ParkModel.findParkBySeq(seq).then(park => {
            return park[0].update({ status: status, reserve: null })
        })
    }

    async reserve_park (seq, reserve) {
        return await ParkModel.findParkBySeq(seq).then(park => {
            return park[0].update({ reserve: reserve, status: "RESERVE" })
        })
    }

    async get_park (seq) {
        return await ParkModel.findOne({ seq: seq }).exec()
    }

    async get_reserve () {
        return await ParkModel.find({ status: "RESERVE" }).exec()
    }

    async get_status () {
        return await ParkModel.aggregate([
            {
                $group: {
                    _id: '$status',
                    'count': {
                        $sum: 1
                    }
                }
            },
            {
                $project: {
                    status: '$_id',
                    count: 1,
                    _id: 0,
                }
            },
            {
                $sort: {
                    status: 1
                }
            }
        ]).exec()
    }
}

module.exports = ParkHelper
