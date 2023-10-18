onmessage = async function ({ data: { url } })  {
  await import(url + 'host.js')
  const accessSpacesIds = await App.runHost(url)
  postMessage(accessSpacesIds)
}

