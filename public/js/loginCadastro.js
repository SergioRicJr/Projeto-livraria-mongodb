const nameRegister = document.querySelector("#input-cadastro-nome")
const emailRegister = document.querySelector("#input-cadastro-email")
const senhaRegister = document.querySelector("#input-cadastro-senha")
const senhaConfirmRegister = document.querySelector("#input-cadastro-confirmSenha")
const btnCadastrar = document.querySelector("#button-cadastro")

btnCadastrar.addEventListener("click", ()=>{
    console.log([nameRegister.value, emailRegister.value, senhaRegister.value, senhaConfirmRegister.value])
})