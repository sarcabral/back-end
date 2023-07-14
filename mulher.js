const express = require('express')
const router = express.Router()
const app = express()

const porta = 3333

function mostraMulher(request, response){
    response.json({
        nome: 'Sarah Cabral',
        imagem: "https://media.licdn.com/dms/image/C4E03AQHlxSXvG3hxyQ/profile-displayphoto-shrink_200_200/0/1652554032704?e=1694649600&v=beta&t=Nx3uw89g6bt7BSdAHBftmO38Pj3adgwkB5d7vd7X9Ko",
        minibio: "Estudante de Engenharia de Computação"
    })
}

function mostraPorta(){
    console.log("Servidor criado e rodando na porta", porta)
}

app.use(router.get('/mulher', mostraMulher))
app.listen(porta, mostraPorta)