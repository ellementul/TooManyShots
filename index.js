export async function Factory(url) {
  const path = url.origin + url.pathname

  await import(path + 'ui.js')
  const promptToken = App.promptToken
  await import(path + 'host.js')
  const runHost = App.runHost
  await import(path + 'client.js')
  const runClient = App.runClient

  
  const hostToken = await promptToken(url, runHost)
  await runClient(hostToken, path)
  console.info("Host and client are running!")
}
