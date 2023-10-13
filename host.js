const { PeerHostTransport } = require('@ellementul/uee-peer-transport')
const { HostFactory } = require("./TooManyBulletsHost")

function runHost() {
  const hostTransport = new PeerHostTransport

  return new Promise((resolve, reject) => {
    hostTransport.onOpen(accessSpacesIds => {
      const host = HostFactory({ transport: hostTransport })
      host.run()
  
      resolve(accessSpacesIds)
    })
  })
}

module.exports = { runHost }