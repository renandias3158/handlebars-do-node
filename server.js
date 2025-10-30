// imports
const express = require('express');
const exphbs = require('express-handlebars');



const app = express();
const port = 3000;

app.listen(port, () =>{
    console.log(`servidor em execução, em http://localhost:${port}`)
})
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', exphbs.engine({defaultLayout: false}));
app.set('view engine', 'handlebars');

let pessoas = [
    {id: 1, nome: 'Renan'},
    {id: 2, nome: 'Luciano'},
    {id: 3, nome: 'Juan'}
]


app.get('/', (req, res) =>{
    res.render('home');
})



app.get('/pessoas', (req, res) =>{
    res.render('listarPessoas', {pessoas});
    
})

app.get('/pessoas/nova', (req, res) =>{
    res.render('cadastrarPessoas');
    
})

app.get('/pessoas/:id'), (req, res => {
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(p => p.id === id);
    if(pessoa){
        res.render('detalharPessoa', {pessoa});
    }else{
        res.status(484).send('Pessoa não encontrada')
    }}

app.post('/pessoas'), (req, res) => {
    const nome = req.body.nome;

    const novapessoa = {
        id: pessoas.length + 1,
        nome: nome
    };

    pessoas.push(novapessoa);

    res.render('listarPessoas', {pessoas})
}