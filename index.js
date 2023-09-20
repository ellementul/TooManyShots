const portfinder = require('portfinder')
const WSServer = require('@ellementul/uee-ws-server')
const StaticServer = require('static-server')

const staticPort = 8080
const staticServer = new StaticServer({ rootPath: './data/', port: staticPort })
staticServer.start(function () {
  console.log('Server listening to', staticServer.port)
})

const wsPort =  await portfinder.getPortPromise()
const wsServer = new WSServer(wsPort)
wsServer.start()

const win = nw.Window.get()
win.enterFullscreen()
win.showDevTools()

const { HostFactory } = require("./TooManyBulletsHost")
const host = HostFactory({ address: `ws://localhost:${wsPort}` })
host.run()

const { PlayerFactory } = require("./TooManyBulletsClient")
const player = PlayerFactory({ address: `ws://localhost:${wsPort}`, baseUrl: `http://localhost:${staticPort}/` })
player.run()