require('dotenv').config()

const http = require('http')

const options = { hostname: process.env.TV_IP, port: 8060, method: 'POST' }

module.exports = app => {
  app.post('/tv/on', () => {
    console.log('Turning the TV on')
    const path = '/keypress/PowerOn'
    http.request({ ...options, path }).end()
  })

  app.post('/tv/off', () => {
    console.log('Turning the TV off')
    const path = '/keypress/PowerOff'
    http.request({ ...options, path }).end()
  })
}
