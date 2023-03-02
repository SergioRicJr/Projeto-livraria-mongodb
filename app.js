import express from 'express'
import router from './routes/rotas.js'
import db from './config/conMongo.js'
import livros from './models/Livro.js'
import controlador from './controller/controller.js'

const app = express()
const PORT = process.env.PORT || 3000

db.on("error", console.log.bind(console, 'Erro de conexão')) 
db.once("open", ()=>{
    console.log("conexão com o banco feita com sucesso")
})

// app.use(router)
app.use(express.json(), router)
// app.use(express.static('public'))


app.listen(PORT, ()=>{
    console.log(`Servidor ouvido em http://localhost:${PORT}`)
})