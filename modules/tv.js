require('dotenv').config()

const http = require('http')

const options = { hostname: process.env.TV_IP, port: 8060, method: 'POST' }

module.exports = app => {
  app.get('/tv/on/:hmac', (req, res) => {
    console.log('Turning the TV on')
    const path = '/keypress/PowerOn'
    http.request({ ...options, path }).end()
    res.sendStatus(200)
  })

  app.get('/tv/off/:hmac', (req, res) => {
    console.log('Turning the TV off')
    const path = '/keypress/PowerOff'
    http.request({ ...options, path }).end()
    res.sendStatus(200)
  })
}
