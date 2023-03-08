import livros from '../models/Livro.js'

class controlador {
    static async mostrarLivros(req, res) {
        // livros.find((err, livros)=> { //tratamento de erro
        //     res.status(200).json(livros)
        // }) //mongoose nao suporta main callback nessa funcao
        res.send(await livros.find())
        // res.status(200).json(livros.find().toJSON())
    }

    static adicionarLivro(req, res) {
        let livro = new livros(req.body);
        livro.save()
        res.send(livro)
    }

    static async deletaLivro(req, res) {
        let id = req.params.id

        await livros.findByIdAndRemove(id)
        res.send(id)
    }

    static async livrosFiltrados(req, res) {
        let query = req.query.query

        let expressao = new RegExp(query, "i")

        const todosLivros = await livros.find()
        const livrosSelecionados = todosLivros.filter(livro=> expressao.test(livro.titulo)|| expressao.test(livro.autor))

        res.send(livrosSelecionados)
    }

    static async atualizarLivro(req, res) {
        let id = req.params.id
        let atualizacoes = req.body
        console.log(atualizacoes)
        // let autorNovo = req.body.autorNovo
    try {
        await livros.findOneAndUpdate({_id: id}, atualizacoes)
        res.send("livro atualizado com sucesso")
    } catch(err) {
        res.send(err.message)
    }
    }
}

export default controlador