const ParkService = require('../../services/ParkServices')

exports.check_reserve_park = async (req, res, next) => {
    const park_service = new ParkService()

    const result = await park_service.get_reserve()

    if (!result.status) return res.json({ status: false, data: [] })
    return res.json(result)
}

exports.reserve_park = async (req, res, next) => {
    const { park, reserve } = req.body

    const park_service = new ParkService()

    const result = await park_service.reserve_car(park, reserve)
    if(!result.status) return res.json({ status: false, message: result.message })

    return res.json(result)
}

exports.get_park_status = async (req, res, next) => {
    const park_service = new ParkService()

    const result = await park_service.get_park_status()

    return res.json(result)
}
