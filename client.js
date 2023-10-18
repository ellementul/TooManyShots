import { PeerClientTransport } from '@ellementul/uee-peer-transport'
const { PlayerFactory } = require("./TooManyBulletsClient")

export function runClient(serverPeerId, url) {
  const clientTransport = new PeerClientTransport(serverPeerId)
  clientTransport.url = url

  return new Promise((resolve, reject) => {
    clientTransport.onOpen(() => {
      console.log("Load client...")
      const player = PlayerFactory({ transport: clientTransport })
      player.run()
      resolve()
    })
  })
}