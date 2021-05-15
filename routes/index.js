const router = require('express-promise-router')();

router.get('/', (req, res, next) => {
  res.json({
    success: true,
    message: "welcome index",
    data: {
      version: "1.0.0"
    }
  })
})

module.exports = router;
