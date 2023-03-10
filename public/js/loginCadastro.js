const nameRegister = document.querySelector("#input-cadastro-nome")
const emailRegister = document.querySelector("#input-cadastro-email")
const senhaRegister = document.querySelector("#input-cadastro-senha")
const senhaConfirmRegister = document.querySelector("#input-cadastro-confirmSenha")
const btnCadastrar = document.querySelector("#button-cadastro")

//tive erro para importar essa funcao colocando no conexaoApi
async function cadastraUsuario(name, email, password, confirmPassword) {
    const conn = await fetch(`http://localhost:3000/cadastro`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email:email,
            password:password,
            confirmPassword: confirmPassword
        })   
    })
}

btnCadastrar.addEventListener("click", ()=>{
    const name = nameRegister.value 
    const email = emailRegister.value
    const password = senhaRegister.value 
    const confirmPassword = senhaConfirmRegister.value
    try {
        cadastraUsuario(name, email, password, confirmPassword)
        console.log("Usuário cadastrado com sucesso")
    } catch(err) {
        console.log(err.message)
    }
})


async function logarUsuario(email, password) {
    const conn = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    const connConvert = await conn.json()
    return connConvert
}

const emailLogin = document.querySelector("#input-login-email")
const senhaLogin = document.querySelector("#input-login-senha")
const btnLogin = document.querySelector("#button-login")

btnLogin.addEventListener("click", async ()=>{
    const email = emailLogin.value
    const password = senhaLogin.value
    try {
        const token = await logarUsuario(email, password)
        localStorage.setItem("authorization", JSON.stringify(token))
        // window.location.href = "http://localhost:3000/livraria.html"
    } catch(err) {
        console.log(err.message)
    }
})
