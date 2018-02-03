require('dotenv').config()

const auth = require('http-auth')
const express = require('express')
const createHmac = require('./create-hmac')

const port = 6440
const app = express()

const basicAuth = auth.basic({}, (u, p, cb) => {
  cb(u === process.env.HTTP_AUTH_USERNAME && p === process.env.HTTP_AUTH_PASSWORD)
})

const checkRequestValidity = (req, res, next) => {
  const url = req.url
  const urlParts = url.split('/')
  const givenHmac = urlParts.pop()
  const validHmac = createHmac(urlParts.join(''))

  if (givenHmac !== validHmac) {
    return res.sendStatus(403).end()
  }

  return next()
}

app.use(auth.connect(basicAuth))
app.use(checkRequestValidity)

require('./modules/tv')(app)

app.listen(port, () => {
  console.log('Waiting for instructions...')
})
