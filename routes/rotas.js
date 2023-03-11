import express from 'express'
import controlador from '../controller/controller.js'
import validaToken from '../middlewares/Autentication.js'

const router = express.Router()

router
    //.get("/", (req, res) => {res.send("Primeira página")})
    .get("/pesquisa", validaToken,controlador.livrosFiltrados)
    .get("/livros", validaToken, controlador.mostrarLivros)
    .post("/livros", validaToken,controlador.adicionarLivro)
    .post("/cadastro", controlador.cadastrarUsuario)
    .post("/login", controlador.loginUser)
    .delete("/livros/:id", validaToken,controlador.deletaLivro)
    .put("/atualizar/:id", validaToken,controlador.atualizarLivro)

export default router