//
//// Generate a URL for a given module and action, adding the HMAC
//
// This way, even if someone stumble upon a URL, they can't guess the others,
// as they're all distinct.
//
// ```bash
// $ node generate-url.js /module/action
// $ /module/action/hmac
// ```
//
if (process.argv.length !== 3) {
  console.log('ERROR: You must pass exactly 1 argument.')
  process.exit(1)
}

const createHmac = require('./create-hmac')

const url = process.argv[2].replace(/\/$/, '')
const hmac = createHmac(url)

console.log(`${url}/${hmac}`)
