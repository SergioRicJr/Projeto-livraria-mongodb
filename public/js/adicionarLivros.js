var btn = document.querySelector("button")
var select = document.querySelector("#genero-input-menu")
var inputTitulo = document.querySelector("#titulo-input-menu")
var inputAutor = document.querySelector("#autor-input-menu")

btn.addEventListener("click", async ()=>{
    var titulo = inputTitulo.value
    var autor = inputAutor.value
    var genero = select[select.selectedIndex].value

    await fetch("http://localhost:3000/livros", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
                "titulo": titulo,
                "autor": autor,
                "genero": genero
                })
    })
})


// async function criando() {
    // await fetch("http://localhost:3000/livros", {
    //     method: "POST",
    //     headers: {"Content-type": "application/json"},
    //     body: JSON.stringify({
    //             "titulo": "Clean Code",
    //             "autor": "Robert C. Marin",
    //             "genero": "Informática"
    //             })
    // })
// }

// btn.addEventListener("click", criando)