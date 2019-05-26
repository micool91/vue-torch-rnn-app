const { Nuxt, Builder } = require('nuxt')

const https = require('https')
const fs = require('fs')
const isProd = (process.env.NODE_ENV === 'production')
const port = 443

// We instantiate nuxt.js with the options
const config = require('./nuxt.config.js')
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
config.dev = !isProd
const nuxt = new Nuxt(config)

// Render every route with Nuxt.js

// Build only in dev mode with hot-reloading
if (config.dev) {
  new Builder(nuxt).build()
    .then(listen)
    .catch((error) => {
      console.error(error)
      process.exit(1)
    })
}
else {
  listen()
}

function listen() {

  const options = {
    key: fs.readFileSync('./jakobowski_app.key'),
    cert: fs.readFileSync('./4fd2b81c3ffb17fa.crt')
  };

  https
    .createServer(options, nuxt.render)
    .listen(port)
  console.log('Server listening on `localhost:' + port + '`.')
}
