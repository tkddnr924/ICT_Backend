const router = require('express-promise-router')();

const carRoute = require('./car')
const parkRoute = require('./park')

router.get('/', (req, res, next) => {
  res.json({
    success: true,
    message: "welcome index",
    data: {
      version: "1.0.0"
    }
  })
})

router.use('/car', carRoute)
router.use('/park', parkRoute)

module.exports = router;
