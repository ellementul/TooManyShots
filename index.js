export async function Factory(url) {
  const { runHost } = require('./host')
  const { runClient } = require('./client')

  let hostToken = prompt("Введите токен сервера если он у вас есть!")

  if(!hostToken) {
    const accessSpacesIds = await runHost(url)
    hostToken = accessSpacesIds.client
    alert(`Токен вашего сервера: ${hostToken}`)
  }

  await runClient(hostToken, url)
  console.log("Host and client are running!")

  // const win = nw.Window.get()
  // win.enterFullscreen()
  // win.showDevTools()
}

