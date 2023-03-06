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
    }

    if (element.classList.contains("btnDelete")) {
        console.log("btn deletar")
        console.log(element.closest(".Livro").id)
        var livroSelecionado = element.closest(".Livro")
        var idLivroSelecionado = livroSelecionado.id

        deletarLivroSelecionado(idLivroSelecionado)
        livroSelecionado.remove()
    }
})



