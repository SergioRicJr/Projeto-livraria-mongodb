import conexaoApi from "./conectaApi.js"
const html = document.querySelector("html")

// console.log($("html"))

async function deletarLivroSelecionado(id) {
        try {
            const conn = await fetch(`http://localhost:3000/livros/${id}`, {
                method: "DELETE"
            })
            console.log("Livro deletado com sucesso")
        } catch(err) {
            console.log(err.message)
        }
}



html.addEventListener("click", (e)=>{

    const element = e.target
    if (element.classList.contains("container-icon")) {
        var menuDrop = $(element).next()
        menuDrop.toggleClass("hide")
        var menuEdicao = $(element).next().next()
        menuEdicao.addClass("hide")
    } 
//mudar linha abaixo p clickOutsideThisElement p reduzir linha
    if (!element.classList.contains("container-icon") && !element.classList.contains("btnEdit") && !element.classList.contains("input-titulo-edit") && !element.classList.contains("input-autor-edit") && !element.classList.contains("salva-alteracao")) {
        $(".menu-dropdown").addClass("hide")
        $(".menu-dropdown-edicao").addClass("hide")
    }

    if (element.classList.contains("salva-alteracao")) {
        let inputTitulo = $(element).closest(".menu-dropdown-edicao").find(".input-titulo-edit").val()
        let inputAutor =  $(element).closest(".menu-dropdown-edicao").find(".input-autor-edit").val()
        let menuEdicao = element.parentElement
        menuEdicao.classList.add("hide")
        let menuDropOption = $(menuEdicao).prev()
        menuDropOption.addClass("hide")
        const id = element.closest(".Livro").id
        conexaoApi.mudaLivro(id, inputTitulo, inputAutor)
    }

    if (element.classList.contains("btnDelete")) {
        console.log("btn deletar")
        console.log(element.closest(".Livro").id)
        var livroSelecionado = element.closest(".Livro")
        var idLivroSelecionado = livroSelecionado.id

        deletarLivroSelecionado(idLivroSelecionado)
        livroSelecionado.remove()
    }

    if (element.classList.contains("btnEdit")) {
        var menuDropEdit = $(element).closest(".menu-dropdown").next()
        menuDropEdit.toggleClass("hide")
        // var menuDrop = element.closest(".menu-dropdown")
        // menuDrop.classList.toggle("hide")
        var inputTitulo = menuDropEdit.find(".input-titulo-edit")
        var inputAutor = menuDropEdit.find(".input-autor-edit")
        // inputTitulo = inputTitulo.find()
        // console.log(inputTitulo)
        // console.log(inputAutor)
    } 

})



