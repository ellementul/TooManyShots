const { runStatic } = require('./static')
const { runHost } = require('./host')
const { runClient } = require('./client')

const url = await runStatic()

let hostToken = prompt("Введите токен сервера если он у вас есть!")

if(!hostToken) {
  const accessSpacesIds = await runHost()
  hostToken = accessSpacesIds.client
  alert(`Токен вашего сервера: ${hostToken}`)
}

await runClient(hostToken, url)
console.log("Host and client are running!")

// const win = nw.Window.get()
// win.enterFullscreen()
// win.showDevTools()



