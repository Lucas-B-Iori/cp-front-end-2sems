const botaoFotos = document.querySelector('#btnMostraFotos')

// CRIAÇÃO DO MODAL E CARROSSEL DE IMAGENS

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

function criaModalBodyImg(index, imagens) {
  const modalBodyImg = document.createElement('img')
  modalBodyImg.src = imagens[index]
  return modalBodyImg
}

function criaModalBodyButtons(textContent, direcao, index, modalBodyImg, imagens) {
  const modalBodyButton = document.createElement('button')
  modalBodyButton.textContent = textContent
  modalBodyButton.addEventListener('click', () => {
    index = mudaFoto(direcao, index, imagens)
    modalBodyImg.src = imagens[index]
  })
  return modalBodyButton
}

function criaModalBody(imagens) {
  let index = 0

  const modalBody = document.createElement('div')
  modalBody.classList.add('modal__body')
  let modalBodyImg = criaModalBodyImg(index, imagens)

  const modalBodyBackButton = criaModalBodyButtons('<', -1, index, modalBodyImg, imagens)
  modalBody.appendChild(modalBodyBackButton)
  
  modalBody.appendChild(modalBodyImg)

  const modalBodyFrontButton = criaModalBodyButtons('>', 1, index, modalBodyImg, imagens)
  modalBody.appendChild(modalBodyFrontButton)
  
  return modalBody
}

function mudaFoto(direcao, index, imagens) {
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

function criaModal() {
  const imagens = [
    './assets/principal.webp',
    './assets/foto-1.webp',
    './assets/foto-2.webp',
    './assets/foto-3.webp',
    './assets/foto-4.webp'
  ]

  const divFade = document.createElement('div')
  divFade.classList.add('fade')
  divFade.addEventListener('click', () => fechaModal(divFade, modal))

  const modal = document.createElement('div')
  modal.classList.add('modal')

  const modalHeader = criaModalHeader(divFade, modal)
  modal.appendChild(modalHeader)

  const modalBody = criaModalBody(imagens)  
  modal.appendChild(modalBody)

  document.body.appendChild(divFade)
  document.body.appendChild(modal)
}

function fechaModal(divFade, modal) {
  document.body.removeChild(divFade)
  document.body.removeChild(modal)
}

botaoFotos.addEventListener('click', criaModal)

// CRIAÇÃO DO MENU

const perfilMenu = document.querySelector('#perfilMenu')

function criaMenu() {
  const menu = document.createElement('div')
  menu.classList.add('menu__flutuante')

  const itensMenu = ['Cadastre-se', 'Entrar', 'Cartões de Presente', 'Anuncie seu espaço no Airbnb', 'Central de ajuda']
  itensMenu.forEach(item => {
    const itemMenu = document.createElement('p')
    itemMenu.textContent = item
    menu.appendChild(itemMenu)
  })

  perfilMenu.parentElement.appendChild(menu)
}

function fechaMenu(menu) {
  perfilMenu.parentElement.removeChild(menu)
}

function trocaMenu(e) {
  if(e.target.parentElement.children.length >= 3) {
    fechaMenu(e.target.parentElement.children[2])
  } else {
    criaMenu()
  }
}

perfilMenu.addEventListener('click', trocaMenu)

// BOTAO SALVAR

const botaoSalvar = document.querySelector('#botaoSalvar')

function defineClassesBotao() {
  const classes = JSON.parse(localStorage.getItem('botaoSalvar'))
  botaoSalvar.className = ''
  for (const i in classes) {
    botaoSalvar.classList.add(classes[i])
  }
}

window.onload = defineClassesBotao()

function favoritar() {
  botaoSalvar.classList.remove('fa-regular')
  botaoSalvar.classList.add('fill')
  botaoSalvar.classList.add('fa-solid')
  
  localStorage.setItem('botaoSalvar', JSON.stringify(botaoSalvar.classList))
}

function desfavoritar() {
  botaoSalvar.classList.remove('fill')
  botaoSalvar.classList.remove('fa-solid')
  botaoSalvar.classList.add('fa-regular')
  
  localStorage.setItem('botaoSalvar', JSON.stringify(botaoSalvar.classList))
}

function mudaBotaoSalvar() {
  if (botaoSalvar.classList.contains('fill')) {
    desfavoritar()
  } else {
    favoritar()
  }
}

botaoSalvar.addEventListener('click', mudaBotaoSalvar)