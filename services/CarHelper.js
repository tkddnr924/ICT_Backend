const CarModel = require('../models/Car')
const moment = require('moment-timezone')

class CarHelper {
    async add_car_data (park, time, type) {

        const newTime = moment.tz(time, 'Asia/Seoul').utc(9)
        const car = new CarModel({
            type: type,
            park_num: park,
            time: newTime
        })

        const message = "[SUCCESS]" + type + " Car at " + time

        return car.save().then(() => {
            return { status: true, message: message }
        }).catch(error => {
            return { status: false }
        })
    }

    async statistic_day () {
        const today = new Date()
        today.setHours(9,0,0,0)

        const tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)
        tomorrow.setHours(9,0,0,0)

        return await CarModel.aggregate([
            {
                $match: {
                    type: "INPUT"
                }
            },
            {
                $group: {
                    _id: {hour: { $hour: '$time' }},
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $project: {
                    count: 1,
                    hour: '$_id.hour',
                    _id: 0
                }
            },
            {
                $sort: {
                    hour: 1
                }
            }
        ]).exec()
    }
}

module.exports = CarHelper
