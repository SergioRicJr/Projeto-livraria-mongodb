import { reiniciarLivrosSite } from "./index.js"
class conexaoApi {
    static async listarLivros() {
        const connect = await fetch("http://localhost:3000/livros")
    
        const connectConvert = await connect.json()
    
        return connectConvert
    }

    static async livrosFiltrados(pesquisa) {
        const con = await fetch(`http://localhost:3000/pesquisa?query=${pesquisa}`)
        const connectConvert = await con.json()
        return connectConvert
    }

    static async mudaLivro(id, tituloNovo, autorNovo) {
        try {
            const conn = await fetch(`http://localhost:3000/atualizar/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    titulo: tituloNovo,
                    autor: autorNovo
                })
            })
            await reiniciarLivrosSite()
            console.log("Alteração feita com sucesso")
        } catch (err) {
            console.log(err.message)
        }
    }
}

export default conexaoApi