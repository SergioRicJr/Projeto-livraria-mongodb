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
}

export default conexaoApi