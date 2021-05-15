const router = require("express-promise-router")();
const controller = require('./controller')

router.post('/reserve', controller.reserve_park)
router.get('/reserve', controller.check_reserve_park)
router.get('/status', controller.get_park_status)

module.exports = router
