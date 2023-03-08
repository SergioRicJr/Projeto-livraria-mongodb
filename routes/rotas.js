import express from 'express'
import controlador from '../controller/controller.js'

const router = express.Router()

router
    //.get("/", (req, res) => {res.send("Primeira página")})
    .get("/pesquisa", controlador.livrosFiltrados)
    .get("/livros", controlador.mostrarLivros)
    .post("/livros", controlador.adicionarLivro)
    .delete("/livros/:id", controlador.deletaLivro)
    .put("/atualizar/:id", controlador.atualizarLivro)


export default router