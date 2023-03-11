import mongoose from 'mongoose'
//criacao de schema para o banco de dados

// Transformar em função para Criar colecao para cada usuario na hora de cadastrar
const livroschema = new mongoose.Schema({
    "id": {type:String},
    "titulo": {type: String, required: true},
    "autor": {type: String, required: true},
    "genero": {type: String, required: true}
})
//criacao de colecao e definicao de schema p ele
const livros = mongoose.model('livros', livroschema)

export default livros