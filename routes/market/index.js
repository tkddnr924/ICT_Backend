const router = require("express-promise-router")();
const controller = require('./controller')

router.get('/statistic/day', controller.market_by_day)

module.exports = router
