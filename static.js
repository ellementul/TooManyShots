const portfinder = require('portfinder')
const StaticServer = require('static-server')

async function runStatic() {
  const staticPort = await portfinder.getPortPromise()
  const staticServer = new StaticServer({ rootPath: './data/', port: staticPort })
  staticServer.start(function () {
    console.log('Server listening to', staticServer.port)
  })
  return `http://localhost:${staticPort}/`
}

module.exports = { runStatic }