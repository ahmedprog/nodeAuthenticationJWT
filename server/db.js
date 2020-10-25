'use strict'
const sqlite3 = require('sqlite3').verbose()

class Db {
  // create user table.
  constructor (file) {
    this.db = new sqlite3.Database(file)
    this.createTable()
  }

  createTable () {
    const sql = `
            CREATE TABLE IF NOT EXISTS user (
                id integer PRIMARY KEY,
                name text,
                email text UNIQUE,
                user_pass text)`
    return this.db.run(sql)
  }

  // select user by email.
  selectByEmail (email, callback) {
    return this.db.get(
      `SELECT * FROM user WHERE email = ?`,
      [email], function (err, row) {
        callback(err, row)
      })
  }
  // select all users.
  selectAll (callback) {
    return this.db.all(`SELECT * FROM user`, function (err, rows) {
      callback(err, rows)
    })
  }
  // store user.
  insert (user, callback) {
    return this.db.run(
      'INSERT INTO user (name,email,user_pass) VALUES (?,?,?)',
      user, (err) => {
        callback(err)
      })
  }
}

module.exports = Db
