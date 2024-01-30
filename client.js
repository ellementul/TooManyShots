import { PeerClientTransport } from '@ellementul/uee-peer-transport'
const { PlayerFactory } = require("./TooManyBulletsClient")

export function runClient(serverPeerId, url) {
  const clientTransport = new PeerClientTransport(serverPeerId)
  clientTransport.url = url

  createFullscreenButton()

  return new Promise((resolve, reject) => {
    clientTransport.onOpen(() => {
      console.info("Load client...")
      const player = PlayerFactory({ transport: clientTransport })
      player.run()
      resolve()
    })
  })
}

function createFullscreenButton() {
  const button = document.createElement('button')
  button.textContent = "Fullscreen"
  button.style.position = "fixed"
  button.style.width = "100px"
  button.style.height = "100px"
  button.style.top = "0px"
  button.style.left = "0px"

  document.body.appendChild(button)

  button.addEventListener("click", function() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
    } else if (document.exitFullscreen) {
        document.exitFullscreen()
    }
  })
}