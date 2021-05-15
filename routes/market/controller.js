const CarService = require('../../services/CarServices')

exports.market_by_day = async (req, res, next) => {
    const car_service = new CarService()

    const result = await car_service.market_day()
    return res.json(result)
}
