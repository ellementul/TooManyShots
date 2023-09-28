const portfinder = require('portfinder')
const WSServer = require('@ellementul/uee-ws-server')
const StaticServer = require('static-server')

const staticPort = 8080
const staticServer = new StaticServer({ rootPath: './data/', port: staticPort })
staticServer.start(function () {
  console.log('Server listening to', staticServer.port)
})

const { PeerHostTransport, PeerClientTransport } = require('./uee-p2p-transport')
const { HostFactory } = require("./TooManyBulletsHost")
const { PlayerFactory } = require("./TooManyBulletsClient")

const hostTransport = new PeerHostTransport
hostTransport.onOpen(accessSpacesIds => {
  const host = HostFactory({ transport: hostTransport })
  host.run()
  
  const clientTransport = new PeerClientTransport(accessSpacesIds.client)
  clientTransport.url = `http://localhost:${staticPort}/`
  clientTransport.onOpen(() => {
    console.log("Load client...")
    const player = PlayerFactory({ transport: clientTransport })
    player.run()
  })
})

// const win = nw.Window.get()
// win.enterFullscreen()
// win.showDevTools()



