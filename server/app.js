'use strict'
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const router = express.Router()
const auth = require('./auth')
const path = require('path');

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

// CORS middleware
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', '*')
  res.header('Access-Control-Allow-Headers', '*')
  next()
}

app.use(allowCrossDomain)
// start registertion user.
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
}) // end register.
router.post('/register', auth.doRegister)// end register.

// start login.
router.post('/login', auth.doLogin)// end login.

app.use(router)

let port = process.env.PORT || 3000

// eslint-disable-next-line no-unused-vars
let server = app.listen(port, function () {
  console.log('Express server listening on port ' + port)
})
