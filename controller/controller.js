//IMPLEMENTAR DOTENV
//IMPLEMENTAR HASH
import {scryptSync, timingSafeEqual} from 'crypto'
// import livros from '../models/Livro.js'
import User from '../models/User.js'
import dotenv from 'dotenv'
import jsonwebtoken from 'jsonwebtoken'
import criaColecaoUser from '../models/Livro.js'

dotenv.config()
//declarar model apenas uma vez usando orientacao a objetos, quando logar 
class controlador {
    // static async iniciarModel(req, res) {
    //     const idUserToken = req.headers.authorization
    //     const idUser = jsonwebtoken.verify(idUserToken, process.env.CHAVE_TOKEN).id
    //     collection = criaColecaoUser(idUser) //testar o uso de this em metodos estaticos
    //     //consertar declaracao de model livros com base no id de usuario,  primeira vez funciona, apos da erro por estar redefinindo model
    // }

    static async mostrarLivros(req, res) { //retornar livro de cada coleção de usuário
        // livros.find((err, livros)=> { //tratamento de erro
        //     res.status(200).json(livros)
        // }) //mongoose nao suporta main callback nessa funcao
        const idUserToken = req.headers.authorization
        const idUser = jsonwebtoken.verify(idUserToken, process.env.CHAVE_TOKEN).id
        const collection = criaColecaoUser(idUser)
        res.send(await collection.find())
        // res.status(200).json(livros.find().toJSON())
    }

    static adicionarLivro(req, res) {
        const idUserToken = req.headers.authorization
        const idUser = jsonwebtoken.verify(idUserToken, process.env.CHAVE_TOKEN).id
        const collection = criaColecaoUser(idUser) //  || mongoose.models.idUser
        let livro = new collection(req.body);
        livro.save()
        res.send(livro)
    }

    static async deletaLivro(req, res) {
        const idUserToken = req.headers.authorization
        const idUser = jsonwebtoken.verify(idUserToken, process.env.CHAVE_TOKEN).id
        const collection = criaColecaoUser(idUser)
        let id = req.params.id

        await collection.findByIdAndRemove(id)
        res.send(id)
    }

    static async livrosFiltrados(req, res) {
        const idUserToken = req.headers.authorization
        const idUser = jsonwebtoken.verify(idUserToken, process.env.CHAVE_TOKEN).id
        const collection = criaColecaoUser(idUser)
        let query = req.query.query

        let expressao = new RegExp(query, "i")

        const todosLivros = await collection.find()
        const livrosSelecionados = todosLivros.filter(livro=> expressao.test(livro.titulo)|| expressao.test(livro.autor))

        res.send(livrosSelecionados)
    }

    static async atualizarLivro(req, res) {
        const idUserToken = req.headers.authorization
        const idUser = jsonwebtoken.verify(idUserToken, process.env.CHAVE_TOKEN).id
        const collection = criaColecaoUser(idUser)
        let id = req.params.id
        let atualizacoes = req.body
        // console.log(atualizacoes)
        // let autorNovo = req.body.autorNovo
    try {
        await collection.findOneAndUpdate({_id: id}, atualizacoes)
        res.send("livro atualizado com sucesso")
    } catch(err) {
        res.send(err.message)
    }
    }

    static async cadastrarUsuario(req, res) {
        //está sendo passado a chave e com base nisso o valor é retirado independente da ordem
        //adicionar validação de regex no 
        const {name, email, password, confirmPassword} = req.body //

         // validations
        if (!name) {
            return res.status(422).json({ msg: "O nome é obrigatório!" });
        }

        if (!email) {
            return res.status(422).json({ msg: "O email é obrigatório!" });
        }

        if (!password) {
            return res.status(422).json({ msg: "A senha é obrigatória!" });
        }

        if (password != confirmPassword) {
            return res
            .status(422)
            .json({ msg: "A senha e a confirmação precisam ser iguais!" });
        }

        const userExists = await User.findOne({ email: email });

        if (userExists) {
            return res.status(422).json({ msg: "Por favor, utilize outro e-mail!" });
        }

        const passwordHash = scryptSync(password, process.env.CRYPTO_SAL, 64).toString('hex')
        
        const novoUsuario = new User({
            name: name,
            email: email,
            passwordHash: passwordHash
        })

        try {
            await novoUsuario.save()
            res.status(201).send("Livro cadastrado com sucesso")
        } catch(err) {
            res.status(422).send("Não foi possivel salvar usuário " + err.message)
        }
    }

    static async loginUser(req, res) {
        const {email, password} = req.body
        const user = await User.findOne({email:email})

        if (user) {
            let passwordGuardada = user.passwordHash
            passwordGuardada = Buffer.from(passwordGuardada, 'hex')
            const passwordHash = scryptSync(password, process.env.CRYPTO_SAL, 64)
            const teste = timingSafeEqual(passwordHash, passwordGuardada)
            if (teste) {
                const token = jsonwebtoken.sign({
                    id: user._id
                }, process.env.CHAVE_TOKEN)
                // this.colecao = criaColecaoUser(user._id)
                res.status(200).json({token: token})
            } else {
                console.log("erro")
                res.send("erro")
            }
            
        }
        
    }
}

export default controlador