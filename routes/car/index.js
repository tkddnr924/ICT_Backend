const router = require("express-promise-router")();
const controller = require('./controller')

router.post('/input', controller.input_car)
router.post('/output', controller.output_car)

module.exports = router
