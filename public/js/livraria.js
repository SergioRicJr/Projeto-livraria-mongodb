import conexaoApi from "./conectaApi.js"
const btn = document.querySelector("#pesquisar")
const input = document.querySelector("#pesquisa")

function CriaElementos(id, autor, genero, titulo, img) {
    const areaLivros = document.querySelector("#area-livros")
    
    var areaLivro = document.createElement("div")
    areaLivro.classList.add('Livro')
    areaLivro.id = id

    var cardLivro = document.createElement("div")
    cardLivro.classList.add('card-livro')
    cardLivro.style.backgroundImage= `url('${img}')`

    var idLivro = document.createElement("div")
    idLivro.classList.add("n_livro")

    var containerIcon = document.createElement("div")
    containerIcon.classList.add("container-icon")
    var icon = document.createElement("i")
    icon.classList.add("fa-solid")
    icon.classList.add("fa-ellipsis-vertical")
    containerIcon.appendChild(icon)

    idLivro.appendChild(containerIcon)

    var menuDrop = document.createElement("div")
    menuDrop.classList.add("menu-dropdown")
    menuDrop.classList.add("hide")
    var listaFunc = document.createElement("ul")
    var btnDeletar = document.createElement("li")
    btnDeletar.classList.add("btnDelete")
    btnDeletar.innerText = "Deletar"
    listaFunc.appendChild(btnDeletar)
    var btnEditar = document.createElement("li")
    btnEditar.classList.add("btnEdit")
    btnEditar.innerText = "Editar"
    listaFunc.appendChild(btnEditar)

    menuDrop.appendChild(listaFunc)

    idLivro.appendChild(menuDrop)

    var menuDropAtualizar = document.createElement("div")
    menuDropAtualizar.classList.add("menu-dropdown-edicao")
    menuDropAtualizar.classList.add("hide")

    var inputTituloNovo = document.createElement("input")
    inputTituloNovo.classList.add("input-titulo-edit")
    inputTituloNovo.value = titulo
    inputTituloNovo.value = titulo
    menuDropAtualizar.appendChild(inputTituloNovo)

    var inputAutorNovo = document.createElement("input")
    inputAutorNovo.classList.add("input-autor-edit")
    inputAutorNovo.value = autor
    inputAutorNovo.value = autor
    menuDropAtualizar.appendChild(inputAutorNovo)

    var buttonSalvaAlteracao = document.createElement("button")
    buttonSalvaAlteracao.classList.add("salva-alteracao")
    buttonSalvaAlteracao.innerText = "Salvar"
    menuDropAtualizar.appendChild(buttonSalvaAlteracao)

    idLivro.appendChild(menuDropAtualizar)

    // var idInterno = document.createTextNode(id)
    // idLivro.appendChild(idInterno)

    var autorLivro = document.createElement("div")
    autorLivro.classList.add("autor")
    var autorInterno = document.createTextNode(autor)
    autorLivro.appendChild(autorInterno)

    var generoLivro = document.createElement("div")
    generoLivro.classList.add("genero")
    var generoInterno = document.createTextNode(genero)
    generoLivro.appendChild(generoInterno)

    cardLivro.appendChild(idLivro)
    cardLivro.appendChild(autorLivro)
    cardLivro.appendChild(generoLivro)

    areaLivro.appendChild(cardLivro)
    
    var tituloLivro = document.createElement("h2")
    var texto = document.createTextNode(titulo)
    tituloLivro.appendChild(texto)
    areaLivro.appendChild(tituloLivro)
    areaLivros.appendChild(areaLivro)
}

async function MostrarLivros() {
    const livros = await conexaoApi.listarLivros()

    for (let i of await livros) {
        CriaElementos(i._id, i.autor, i.genero, i.titulo, i.img)
    }
}

const tokenGuardado = JSON.parse(localStorage.getItem("authorization"))
if (tokenGuardado.token){
    MostrarLivros()
} else {
    console.log("erro")
}


async function reiniciarLivrosSite() {
    const areaLivros = document.querySelectorAll("#area-livros > *") 

        for (let x of areaLivros) {
            if (x.id != "menu-lateral-adicionar") {
                x.remove()
            }
            
        }
        MostrarLivros()
}

btn.addEventListener("click", async ()=>{
    var inputValue = input.value
    inputValue = inputValue.trim()

    if (inputValue != '') {
        const livros = await conexaoApi.livrosFiltrados(inputValue)
        console.log(livros)

        // const livrosExistentes = await conectaApi.listaLivros()
        // console.log(livrosExistentes)
        // const livrosExistentes
        // const qtdeLivros = livrosExistentes.length
        const areaLivros = document.querySelectorAll("#area-livros > *") 

        for (let x of areaLivros) {
            x.remove()
        }

        for (let i of await livros) {
            var id = i._id
            var autor = i.autor
            var genero = i.genero
            var titulo = i.titulo

            CriaElementos(id, autor, genero, titulo)
        }
    } else {
        reiniciarLivrosSite()
    }
})

export {reiniciarLivrosSite}
