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
}

export default controlador