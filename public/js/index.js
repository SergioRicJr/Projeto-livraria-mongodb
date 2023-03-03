const btn = document.querySelector("#pesquisar")

async function carregarLivros() {
    const conecct = await fetch("http://localhost:3000/livros")
    const conecctConvert = await conecct.json()
    console.log(conecctConvert)
}

carregarLivros()