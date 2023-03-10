import { reiniciarLivrosSite } from "./livraria.js"

const btnMenu = document.querySelector(".menu-fechado")
const menuLateral = document.querySelector("#menu-lateral-adicionar")

console.log(btnMenu)

btnMenu.addEventListener("click", ()=>{
    menuLateral.classList.toggle("hide")
})

var btn = document.querySelector("#button-adicionar-livro")
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
    reiniciarLivrosSite() //substituir esse metodo por append de livro na area de livro
})