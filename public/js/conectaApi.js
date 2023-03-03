class conexaoApi {
    static async listaLivros() {
        const connect = await fetch("http://localhost:3000/livros")
    
        const connectConvert = await connect.json()
    
        return connectConvert
    }
}