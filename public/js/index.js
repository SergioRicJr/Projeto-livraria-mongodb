import conexaoApi from "./conectaApi.js"
const btn = document.querySelector("#pesquisar")
const input = document.querySelector("#pesquisa")
{/* <div class="Livro">
        <div class="card-livro">
            <div class="n_livro">
                <div class="container-icon"><i class="fa-solid fa-ellipsis-vertical"></i></div>
                <div class="menu-dropdown">
                    <ul>
                        <li class="btnDelete">Deletar</li>
                        <li>Funcao2</li>
                        <li>Funcao3</li>
                    </ul>
                </div>
            </div>
            <div class="autor">autor</div>
            <div class="genero">genero</div>
        </div>
        <h2>Titulo do livro</h2>
    </div> */}
function CriaElementos(id, autor, genero, titulo) {
    const areaLivros = document.querySelector("#area-livros")
    
    var areaLivro = document.createElement("div")
    areaLivro.classList.add('Livro')
    areaLivro.id = id

    var cardLivro = document.createElement("div")
    cardLivro.classList.add('card-livro')

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
        CriaElementos(i._id, i.autor, i.genero, i.titulo)
    }
}

MostrarLivros()

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
        const areaLivros = document.querySelectorAll("#area-livros > *") 
    
        for (let x of areaLivros) {
            x.remove()
        }
        MostrarLivros()
    }
})
