const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
app.set('port', 8081)

app.use(express.static(path.join(__dirname, 'site-test')))

let server
// server = http.createServer(app)
// server.listen(8080)
/**
 * Create HTTP server.
 */
exports.createServer = () => {
  server = http.createServer(app)
  server.listen(8081)
}

/**
 * Closes HTTP server.
 */
exports.closeServer = () => {
  server.close()
}
