import dotenv from 'dotenv'
import  jsonwebtoken from 'jsonwebtoken'

dotenv.config()
//validação de token funcionando

function validaToken(req, res, next) {
    const token = req.headers.authorization

    console.log(token)
    const validacao = jsonwebtoken.verify(token, process.env.CHAVE_TOKEN)
    
    if (validacao) {
        next()
    } else {
        res.status(422).send("Usuário não autenticado")
    }
}

export default validaToken