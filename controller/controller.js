import livros from '../models/Livro.js'

class controlador {
    static mostrarLivros(req, res) {
        livros.find((err, livros)=> { //tratamento de erro
            res.status(200).send(livros)
        })
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