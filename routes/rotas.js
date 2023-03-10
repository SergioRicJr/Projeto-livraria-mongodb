import express from 'express'
import controlador from '../controller/controller.js'
import validaToken from '../middlewares/Autentication.js'

const router = express.Router()

router
    //.get("/", (req, res) => {res.send("Primeira página")})
    .get("/pesquisa", controlador.livrosFiltrados)
    .get("/livros", validaToken, controlador.mostrarLivros)
    .post("/livros", controlador.adicionarLivro)
    .post("/cadastro", controlador.cadastrarUsuario)
    .post("/login", controlador.loginUser)
    .delete("/livros/:id", controlador.deletaLivro)
    .put("/atualizar/:id", controlador.atualizarLivro)

export default router