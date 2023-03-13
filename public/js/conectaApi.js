import { reiniciarLivrosSite } from "./livraria.js"
class conexaoApi {
    static async listarLivros() {
        const tokenGuardad = JSON.parse(localStorage.getItem("authorization"))

        const connect = await fetch("http://localhost:3000/livros",{
            headers: {"authorization": tokenGuardad.token}
        })
    
        const connectConvert = await connect.json()
    
        return connectConvert
    }

    static async livrosFiltrados(pesquisa) {
        
        const con = await fetch(`http://localhost:3000/pesquisa?query=${pesquisa}`,{
            headers: {"authorization": tokenGuardad.token}
        })
        const connectConvert = await con.json()
        return connectConvert
    }

    static async mudaLivro(id, tituloNovo, autorNovo) {
        try {
            const tokenGuardad = JSON.parse(localStorage.getItem("authorization"))
            const conn = await fetch(`http://localhost:3000/atualizar/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "authorization": tokenGuardad.token
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