const CarService = require('../../services/CarServices')
const ParkService = require('../../services/ParkServices')

exports.input_car = async (req, res, next) => {
    const { park, time } = req.body

    const park_service = new ParkService()
    const car_service = new CarService()

    const parking = await park_service.park_car(park)
    if (!parking.status) return res.json({ status: false, message: parking.message })

    const result = await car_service.input_car(parking.park, time)
    return res.json(result)
}

exports.output_car = async (req, res, next) => {
    const { park, time } = req.body

    const park_service = new ParkService()
    const car_service = new CarService()

    const parking = await park_service.empty_car(park)
    if (!parking.status) return res.json({ status: false, message: parking.message })

    const result = await car_service.output_car(parking.park, time)
    return res.json(result)
}

