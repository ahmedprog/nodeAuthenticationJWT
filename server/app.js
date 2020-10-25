'use strict'
const express = require('express')
const DB = require('./db')
const config = require('./config')
// use bcrypt to hash passwords
const bcrypt = require('bcrypt')
// use jsonwebtoken (jwt authentication users) .
const jwt = require('jsonwebtoken')
// use bodyParser To read json dat
const bodyParser = require('body-parser')

const db = new DB('sqlitedb')

const app = express()
const router = express.Router()
const register = require('./auth/register')
const login = require('./auth/login')

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
router.post('/register', register.doRegister)// end register.

// start login.
router.post('/login', login.doLogin)// end login.

app.use(router)

let port = process.env.PORT || 3000

// eslint-disable-next-line no-unused-vars
let server = app.listen(port, function () {
  console.log('Express server listening on port ' + port)
})
