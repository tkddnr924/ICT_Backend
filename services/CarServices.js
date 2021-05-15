const db = require('mongoose')
const CarHelper = require('./CarHelper')

class CarServices {
    constructor() {
        this.helper = new CarHelper()
    }

    async input_car (park_id, time) {
        const park = db.Types.ObjectId(park_id)
        const result = await this.helper.add_car_data(park, time, "INPUT")

        if (!result.status) return { status: result.status, message: "FAIL..." }

        return result
    }

    async output_car (park_id, time) {
        const park = db.Types.ObjectId(park_id)
        const result = await this.helper.add_car_data(park, time, "OUTPUT")

        if (!result.status) return { status: result.status, message: "FAIL..." }

        return result
    }

    async market_day () {
        const result = await this.helper.statistic_day()

        return { status: true, data: result }
    }
}


module.exports = CarServices
