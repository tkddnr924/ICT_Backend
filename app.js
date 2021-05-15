const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const config = require('./cfg/index')
const winston = require('./utils/winston')

const init = server => {
  server.use(cors(
      {
        methods: ['POST','GET','PUT','DELETE','PATCH'],
        credentials: true,
        allowedHeaders: ['Origin','X-Requested-With','Content-Type','Accept','Authorization'],
        withCredentials: true
      }
  ))

  server.use(bodyParser.json()) // support json encoded bodies
  server.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies
  server.use(cookieParser())

  const mainRouter = require('./routes')
  server.use('/', mainRouter)

  server.use((req,res,next)=>[
    res.status(404).json({message:"PageNotFound"}).end()
  ])

  server.use((err, req, res, next) => {
    const ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;
    winston.error(String(ip)+' - ' + String(err))
    res
        .status(500)
        .json({
          message:
              "예상치 못한 오류가 발생했습니다",
        })
        .end()

    next(err)
  })
  return server;
};

const server = express()
const app = init(server)

// mongo db
const { connect, initSchemas } = require('./models');

(async () => {
    await connect()
    initSchemas()
})();

server.listen(config.port,'0.0.0.0', () => {
  winston.info(`> Ready on http://localhost:${config.port}`)
})

module.exports = app;
