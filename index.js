export async function Factory(url) {
  let hostToken = url.searchParams.get('token')
  url = url.origin + url.pathname

  if(!hostToken)
    hostToken = await promptToken(url)

  await import(url + 'client.js')
  await App.runClient(hostToken, url)
  console.info("Host and client are running!")
}

async function promptToken(url) {
  const promptEl = createPromptModalWindow()

  const token = await getToken(url, promptEl)
  promptEl.remove()

  const hostAddressEl = createAddressModalWindow()
  
  await showToken(url, token, hostAddressEl)
  hostAddressEl.remove()

  return token
}

async function getToken(url, promptEl) {
  const inputPromise = getTokenFromInput(promptEl)
  const hostPromise = getTokenFromHost(url, promptEl)
  
  return Promise.any([inputPromise, hostPromise])
}

function getTokenFromInput(prompt) {
  return new Promise(resolve => {
    const checkToken = () => {
      const token = prompt.tokenInput.value.trim()
      if(token) {
        prompt.connectButton.removeEventListener('click', checkToken)

        resolve(token)
      }
    }

    prompt.connectButton.addEventListener('click', checkToken)
  })
}

function getTokenFromHost(url, prompt) {
  return new Promise(resolve => {
    const create = async () => {
      await import(url + 'host.js')

      prompt.createButton.removeEventListener('click', create)
      const accessSpacesIds = await App.runHost(url)

      resolve(accessSpacesIds.client)
    }

    prompt.createButton.addEventListener('click', create)
  })
}

async function showToken(url, hostToken, hostAddressEl) {
  // const fullUrl = new URL(url)
  const fullUrl = new URL("https://ellementul.github.io/TMS-browser/")
  fullUrl.searchParams.set('token', hostToken)

  hostAddressEl.tokenInput.value = hostToken
  hostAddressEl.url.src = fullUrl.href
  hostAddressEl.url.textContent = fullUrl.href

  return new Promise(resolve => {
    const close = async () => {
      if(token) {
        hostAddressEl.closeButton.removeEventListener('click', close)

        resolve()
      }
    }

    hostAddressEl.closeButton.addEventListener('click', close)
  })
}

function createPromptModalWindow() {
  const prompt = document.createElement("section")
  prompt.setAttribute("id", "prompt")
  prompt.classList.add("modal")
  document.body.append(prompt)

  const tokenInput = document.createElement("input")
  tokenInput.setAttribute("id", "token")
  tokenInput.setAttribute("placeholder", "Введите токен сервера")
  prompt.tokenInput = tokenInput
  prompt.append(tokenInput)

  const connectBth = document.createElement("button")
  connectBth.textContent = "Подключится к серверу"
  connectBth.classList.add("btn")
  connectBth.classList.add("btn-connect")
  prompt.connectButton = connectBth
  prompt.append(connectBth)

  const createBth = document.createElement("button")
  createBth.textContent = "Создать сервер"
  createBth.classList.add("btn")
  createBth.classList.add("btn-create")
  prompt.createButton = createBth
  prompt.append(createBth)

  return prompt
}

function createAddressModalWindow() {
  const address = document.createElement("section")
  address.setAttribute("id", "address")
  address.classList.add("modal")
  document.body.append(address)

  const url = document.createElement("a")
  url.setAttribute("id", "hostUrl")
  const p = document.createElement("p")
  p.append(url)
  address.url = url
  address.append(p)

  const tokenInput = document.createElement("input")
  tokenInput.setAttribute("id", "token")
  address.tokenInput = tokenInput
  address.append(tokenInput)

  const closeBth = document.createElement("button")
  closeBth.textContent = "OK"
  closeBth.classList.add("btn")
  closeBth.classList.add("btn-close")
  address.closeButton = closeBth
  address.append(closeBth)

  return address
}
