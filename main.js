const botaoFotos = document.querySelector('#btnMostraFotos')

const imagens = [
  './assets/principal.webp',
  './assets/foto-1.webp',
  './assets/foto-2.webp',
  './assets/foto-3.webp',
  './assets/foto-4.webp'
]

function criaModalHeader(divFade, modal) {
  const modalHeader = document.createElement('div')
  modalHeader.classList.add('modal__header')
  
  const modalCloseButton = document.createElement('i')
  modalCloseButton.classList.add('fa')
  modalCloseButton.classList.add('fa-times-circle')
  modalCloseButton.addEventListener('click', () => fechaModal(divFade, modal))
  modalHeader.appendChild(modalCloseButton)
  return modalHeader
}

function criaModalBodyImg(index) {
  const modalBodyImg = document.createElement('img')
  modalBodyImg.src = imagens[index]
  return modalBodyImg
}

function criaModalBodyButtons(textContent, direcao, index, modalBodyImg) {
  const modalBodyButton = document.createElement('button')
  modalBodyButton.textContent = textContent
  modalBodyButton.addEventListener('click', () => {
    index = mudaFoto(direcao, index)
    modalBodyImg.src = imagens[index]
  })
  return modalBodyButton
}

function criaModalBody() {
  let index = 0

  const modalBody = document.createElement('div')
  modalBody.classList.add('modal__body')
  let modalBodyImg = criaModalBodyImg(index)

  const modalBodyBackButton = criaModalBodyButtons('<', -1, index, modalBodyImg)
  modalBody.appendChild(modalBodyBackButton)
  
  modalBody.appendChild(modalBodyImg)

  const modalBodyFrontButton = criaModalBodyButtons('>', 1, index, modalBodyImg)
  modalBody.appendChild(modalBodyFrontButton)
  
  return modalBody
}

function criaModal() {
  const divFade = document.createElement('div')
  divFade.classList.add('fade')
  divFade.addEventListener('click', () => fechaModal(divFade, modal))

  const modal = document.createElement('div')
  modal.classList.add('modal')

  const modalHeader = criaModalHeader(divFade, modal)
  modal.appendChild(modalHeader)

  const modalBody = criaModalBody()  
  modal.appendChild(modalBody)

  document.body.appendChild(divFade)
  document.body.appendChild(modal)
}

function fechaModal(divFade, modal) {
  document.body.removeChild(divFade)
  document.body.removeChild(modal)
}

function mudaFoto(direcao, index) {
  if (direcao === 1) {
    if (index !== imagens.length - 1) {
      index += direcao 
      return index
    }
    return 0
  }
  if (direcao === -1) {
    if (index !== 0) {
      return index + direcao
    }
    return imagens.length - 1
  }
}

botaoFotos.addEventListener('click', criaModal)