import { PeerHostTransport } from '@ellementul/uee-peer-transport'
const { HostFactory } = require("./TooManyBulletsHost")

export function runHost(url) {
  const hostTransport = new PeerHostTransport
  hostTransport.url = url

  return new Promise((resolve, reject) => {
    hostTransport.onOpen(accessSpacesIds => {
      const host = HostFactory({ transport: hostTransport })
      host.run()
  
      resolve(accessSpacesIds)
    })
  })
}