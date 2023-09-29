const portfinder = require('portfinder')

const StaticServer = require('static-server')

const staticPort = await portfinder.getPortPromise()
const staticServer = new StaticServer({ rootPath: './data/', port: staticPort })
staticServer.start(function () {
  console.log('Server listening to', staticServer.port)
})

const { PeerHostTransport, PeerClientTransport } = require('@ellementul/uee-peer-transport')
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



