require('dotenv').config()

const crypto = require('crypto')

const key = process.env.HMAC_KEY
const createHmac = s => crypto.createHmac('sha1', key).update(s).digest('hex')

module.exports = createHmac
