/* eslint-disable no-undef */
const DB = require('../db')
const config = require('../config')
// use bcrypt to hash passwords
const bcrypt = require('bcrypt')
// use jsonwebtoken (jwt authentication users) .
const jwt = require('jsonwebtoken')
const db = new DB('sqlitedb')

exports.doLogin = (req, res) => {
  db.selectByEmail(req.body.email, (err, user) => {
    if (err) return res.status(500).send('Error on the server.')
    if (!user) return res.status(404).send('No user found.')
    let passwordIsValid = bcrypt.compareSync(req.body.password, user.user_pass)
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null })
    let token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 // expires in 24 hours
    })
    res.status(200).send({ auth: true, token: token, user: user })
  })
}

exports.doRegister = function (req, res) {
  db.insert([
    req.body.name,
    req.body.email,
    bcrypt.hashSync(req.body.password, 8)
  ],
  function (err) {
    if (err) return res.status(500).send('There was a problem registering the user.')
    db.selectByEmail(req.body.email, (err, user) => {
      if (err) return res.status(500).send('There was a problem getting user')
      let token = jwt.sign({ id: user.id }, config.secret, {expiresIn: 86400 // expires in 24 hours
      })
      res.status(200).send({ auth: true, token: token, user: user })
    })
  })
}
