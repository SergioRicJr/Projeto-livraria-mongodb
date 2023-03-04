var btn = document.querySelector("button")

async function criando() {
    await fetch("http://localhost:3000/livros", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
                "titulo": "Clean Code",
                "autor": "Robert C. Marin",
                "genero": "Informática"
                })
    })
}

btn.addEventListener("click", criando)