require('dotenv').config()

const basicAuth = require('basic-auth')
const bodyParser = require('body-parser')
const express = require('express')

const port = 6440
const app = express()

const checkRequestValidity = (req, res, next) => {
  if (req.body !== process.env.HASH) {
    return res.status(403).end()
  }

  return next()
}

app.use(basicAuth(process.env.HTTP_AUTH_USERNAME, process.env.HTTP_AUTH_PASSWORD)
app.use(bodyParser.text())
app.use(checkRequestValidity)

require('./modules/tv')(app)

app.listen(port, () => {
  console.log('Waiting for instructions...')
})
