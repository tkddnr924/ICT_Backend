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

    async statistic_day () {}
}

module.exports = CarHelper
