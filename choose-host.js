export async function promptToken(url, runHost) {
    const hostToken = url.searchParams.get('token')
    
    if(hostToken)
      return hostToken

    AddStyles()
  
    const promptEl = createPromptModalWindow()
  
    url = url.origin + url.pathname
    const newHostToken = await getToken(url, promptEl, runHost)
    promptEl.remove()
  
    const hostAddressEl = createAddressModalWindow()
    
    await showToken(url, newHostToken, hostAddressEl)
    hostAddressEl.remove()
  
    return newHostToken
}

function AddStyles() {
    const style = document.createElement('style')

    style.textContent = `
        .modal {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 0.4rem;
            width: 450px;
            padding: 1.3rem;
            min-height: 250px;
            position: absolute;
            top: 20%;
            background-color: white;
            border: 1px solid #ddd;
            border-radius: 15px;
        }
    
        .modal .flex {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    
        .modal input {
            padding: 0.7rem 1rem;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 0.9em;
        }
    
        .modal p {
            font-size: 0.9rem;
            color: #777;
            margin: 0.4rem 0 0.2rem;
        }
    
        button {
            cursor: pointer;
            border: none;
            font-weight: 600;
        }
    
        .btn {
            display: inline-block;
            padding: 0.8rem 1.4rem;
            font-weight: 700;
            background-color: black;
            color: white;
            border-radius: 5px;
            text-align: center;
            font-size: 1em;
        }
    
        .overlay {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(3px);
            z-index: 1;
        }
    
        .modal {
            z-index: 2;
        }
    
        .hidden {
            display: none;
        }
    `;

    document.head.appendChild(style)

}

async function getToken(url, promptEl, runHost) {
    const inputPromise = getTokenFromInput(promptEl)
    const hostPromise = getTokenFromHost(url, promptEl, runHost)
    
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

function getTokenFromHost(url, prompt, runHost) {
    return new Promise(resolve => {
    const create = async () => {

        prompt.createButton.removeEventListener('click', create)
        const accessSpacesIds = await runHost(url)

        resolve(accessSpacesIds.client)
    }

    prompt.createButton.addEventListener('click', create)
    })
}

async function showToken(url, hostToken, hostAddressEl) {
    const fullUrl = new URL(url)
    // const fullUrl = new URL("https://ellementul.github.io/TMS-browser/")
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