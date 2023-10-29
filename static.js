const localIpAddress = require("local-ip-address")
const portfinder = require('portfinder')
const StaticServer = require('static-server')

async function runStatic() {
  const staticPort = await portfinder.getPortPromise()
  const staticServer = new StaticServer({ rootPath: './data/', port: staticPort })
  staticServer.start(function () {
    console.info('Server listening to', staticServer.port)
  })
  const ip = localIpAddress()
  return new URL(`http://${ip}:${staticPort}/`)
}

module.exports = { runStatic }