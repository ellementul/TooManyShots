// import { runClient } from './client.js'
// import { runHost } from './host.js'

export async function Factory(url) {
  let hostToken = url.searchParams.get('token')
  url = url.origin + url.pathname
  console.log('url', url)

  if(!hostToken)
    hostToken = await promptToken(url)

  await import(url + 'client.js')
  await App.runClient(hostToken, url)
  console.log("Host and client are running!")
}

const prompt = document.querySelector("#prompt")
const connectBth = document.querySelector(".btn-connect")
const createBth = document.querySelector(".btn-create")
const tokenInput = document.querySelector("#token")

const host = document.querySelector("#host")
const hostTokenInput = document.querySelector("#hostToken")
const hostUrlLink = document.querySelector("#hostUrl")
const closeBth = document.querySelector(".btn-close")

const open = function () {
  this.classList.remove("hidden")
}

const close = function () {
  this.classList.add("hidden")
}

prompt.open = open
prompt.close = close

host.open = open
host.close = close


async function promptToken(url) {
  prompt.open()

  const token = await getToken(url)
  prompt.close()
  host.open()
  
  await showToken(url, token)
  host.close()

  return token
}

async function getToken(url) {
  const inputPromise = getTokenFromInput()
  const hostPromise = getTokenFromHost(url)
  
  return Promise.any([inputPromise, hostPromise])
}

function getTokenFromInput() {
  return new Promise(resolve => {
    const checkToken = () => {
      const token = tokenInput.value.trim()
      if(token) {
        connectBth.removeEventListener('click', checkToken)

        resolve(token)
      }
    }

    connectBth.addEventListener('click', checkToken)
  })
}

function getTokenFromHost(url) {
  return new Promise(resolve => {
    const create = async () => {
      await import(url + 'host.js')

      createBth.removeEventListener('click', create)
      const accessSpacesIds = await App.runHost(url)

      resolve(accessSpacesIds.client)
    }

    createBth.addEventListener('click', create)
  })
}

async function showToken(url, hostToken) {
  // const fullUrl = new URL(url)
  const fullUrl = new URL("https://ellementul.github.io/TMS-browser/")
  fullUrl.searchParams.set('token', hostToken)

  hostTokenInput.value = hostToken
  hostUrlLink.src = fullUrl.href
  hostUrlLink.textContent = fullUrl.href

  return new Promise(resolve => {
    const close = async () => {
      if(token) {
        closeBth.removeEventListener('click', close)

        resolve()
      }
    }

    closeBth.addEventListener('click', close)
  })
}

