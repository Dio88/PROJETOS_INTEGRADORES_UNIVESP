const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sPedido = document.querySelector('#m-pedido')
const sBebida = document.querySelector('#m-bebida')
const sEndereço = document.querySelector('#m-endereço')
const sHora = document.querySelector('#m-hora')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sNome.value = itens[index].nome
    sPedido.value = itens[index].pedido
    sBebida.value = itens[index].bebida
    sEndereço.value = itens[index].endereço
    sHora.value = itens[index].Hora
    id = index
  } else {
    sNome.value = ''
    sPedido.value = ''
    sBebida.value = ''
    sEndereço.value = ''
    sHora.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.nome}</td>
    <td>${item.pedido}</td>
    <td>${item.bebida}</td>
    <td>${item.endereço}</td>
    <td>${item.Hora}</td>

    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sPedido.value == '' || sBebida.value == '' || sEndereço.value == '' || sHora.value == '' ) {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].nome = sNome.value
    itens[id].pedido = sPedido.value
    itens[id].bebida = sBebida.value
    itens[id].endereço= sEndereço.value
    itens[id].Hora= sHora.value
  } else {
    itens.push({'nome': sNome.value, 'pedido': sPedido.value, 'bebida': sBebida.value, 'endereço': sEndereço.value, 'Hora': sHora.value })
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()