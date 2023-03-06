const html = document.querySelector("html")

// console.log($("html"))

html.addEventListener("click", (e)=>{

    const element = e.target
    if (element.classList.contains("container-icon")) {
        var menuDrop = $(element).next()
        menuDrop.toggleClass("hide")
    }

    if (element.classList.contains("btnDelete")) {
        console.log("btn deletar")
        console.log(element.closest(".Livro"))
    }
})



