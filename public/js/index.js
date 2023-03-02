var btn = document.querySelector("button")

async function criando() {
    const conect = await fetch("http://localhost:3000/livros", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: {
                "titulo": "Biblia",
                "autor": "Deus",
                "genero": "religião"
                }
    })
}

btn.addEventListener("click", criando)