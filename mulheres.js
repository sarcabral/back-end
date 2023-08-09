const express = require('express') //aqui estou iniciando o express
const router = express.Router() //aqui estou configurando a primeira parte da rota
// const { v4: uuidv4 } = require('uuid'); //chama biblioteca uuid

const cors = require('cors') //aqui estou trazendo o pacote cors que permite consumir essa API no front-end

const conectaBancoDeDados = require('./bancoDeDados') //ligando ao arquivo bancoDeDados
conectaBancoDeDados() //chamando a função que conecta o banco de dados

const Mulher = require('./mulherModel')

const app = express() // aqui estou iniciado o app
app.use(express.json()) //dados que vão trafegar serão no formato json
app.use(cors())

const porta = 3333 // aqui estou criando a porta

// aqui estou criando lista inicial de mulheres 
/*const mulheres = [
    {
        id: '1',
		nome : 'Simara Conceição',
		imagem: 'https://bit.ly/3LJIyOF',
		minibio: 'Desenvolvedora e instrutora'
	},
    {
        id: '2',
        nome: 'Sarah Cabral',
        imagem: "https://media.licdn.com/dms/image/C4E03AQHlxSXvG3hxyQ/profile-displayphoto-shrink_200_200/0/1652554032704?e=1694649600&v=beta&t=Nx3uw89g6bt7BSdAHBftmO38Pj3adgwkB5d7vd7X9Ko",
        minibio: "Estudante de Engenharia de Computação"
    }
]
*/

// GET
async function mostraMulheres(request, response){
    try{
        const mulheresVindasDoBancoDeDados = await Mulher.find()

        response.json(mulheresVindasDoBancoDeDados)
    }catch(erro){
        console.log(erro)
    }
}

// POST
async function criaMulher(request, response){
    const novaMulher = new Mulher({
        // id: uuidv4(),
        nome: request.body.nome,
        imagem: request.body.imagem,
        minibio: request.body.minibio,
        citacao: request.body.citacao
    })

    /*
    mulheres.push(novaMulher)
    response.json(mulheres)
    */

    try{
        const mulherCriada = await novaMulher.save()
        response.status(201).json(mulherCriada)
    }catch(erro){
        console.log(erro)
    }
        
}

//PATCH
async function corrigeMulher(request, response){
    /*
    function encontraMulher(mulher){
        if(mulher.id === request.params.id){
            return mulher
        }
    }
    */

    try{
        const mulherEncontrada = await Mulher.findById(request.params.id)
        
        //const mulherEncontrada = mulheres.find(encontraMulher)
        if(request.body.nome){
            mulherEncontrada.nome = request.body.nome
        }
        if(request.body.imagem){
            mulherEncontrada.imagem = request.body.imagem
        }
        if(request.body.minibio){
            mulherEncontrada.minibio = request.body.minibio
        }
        if(request.body.citacao){
            mulherEncontrada.citacao = request.body.citacao
        }

        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
        response.json(mulherAtualizadaNoBancoDeDados)

    } catch(erro){
        console.log(erro)
    }
    
}

//DELETE
async function deletaMulher(request, response){ 
    /*
    function todasMenosEla(mulher){
        if(mulher.id !== request.params.id){
            return mulher
        }
    }
    */

    try{
        await Mulher.findByIdAndDelete(request.params.id)
        response.json({ mensagem: 'Mulher deletada com sucesso!' })

    }catch(erro){
        console.log(erro)
    }

    //const mulheresQueFicam = mulheres.filter(todasMenosEla)
    //response.json(mulheresQueFicam)
}

app.use(router.get('/mulheres', mostraMulheres)) // configurei rota GET /mulheres
app.use(router.post('/mulheres', criaMulher)) // configurei rota POST /mulheres
app.use(router.patch('/mulheres/:id', corrigeMulher)) // configurei a rota patch /mulheres/:id
app.use(router.delete('/mulheres/:id', deletaMulher)) // configurei a rota DELETE /mulheres/:id

//PORTA
function mostraPorta(){
    console.log('Servidor criado e rodando na porta', porta)
}
app.listen(porta, mostraPorta) // servidor ouvindo a porta 

