const CarModel = require('../models/Car')

class CarHelper {

    async add_car_data (park, time, type) {
        const car = new CarModel({
            type: type,
            park_num: park,
            time: new Date(time)
        })

        const message = "[SUCCESS]" + type + " Car at " + time

        return car.save().then(() => {
            return { status: true, message: message }
        }).catch(error => {
            return { status: false }
        })
    }
}

module.exports = CarHelper
