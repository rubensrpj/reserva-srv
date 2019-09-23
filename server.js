const config = require('./config') //aqui estamos retornando a configuração criada nesse arquivo relacionado ao bd
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mountRoutes = require('./routes')

//Aqui estamos usando o 'body-parser' para obter as informações das requisições via POST (parâmetros)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Adicionando header para todas as requisições do servidor
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    if (req.method === 'OPTIONS') {
        res.end()
    }
    else {
        next()
    }
})

app.get('/', function (req, res) {

    // Depois colocar esse html em arquivo
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head>')
    res.write('  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">')
    res.write('  <meta name="viewport" content="width=device-width, initial-scale=1">')
    res.write('  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"> ')
    res.write('  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>')
    res.write('  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>')
    res.write('  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>')
    res.write('</head>')
    res.write('  <body>')
    res.write('    <div class="jumbotron jumbotron-fluid"> ')
    res.write('      <div class="container"> ')
    res.write('        <h1 class="display-4">Meu Brinquedo</h1> ')
    res.write('        <p class="lead">Relação de APIs de integração com o site Meu Brinquedo</p>')
    res.write('      </div> ')
    res.write('    </div> ')
    res.write('    <div class="container">')
    res.write('      <div class="card bg-primary">')
    res.write('        <div class="card-header text-white">')
    res.write('          Relação de APis')
    res.write('        </div>')
    res.write('        <div class="list-group">')
    res.write('          <a href="http://localhost:' + config.confSrv.porta + '/api/produto" class="list-group-item list-group-item-action">Produto</a>')
    res.write('        </div>')
    res.write('      </div>')
    res.write('    </div>')
    res.write('  </body>')
    res.write('</html>')
    res.end()
})



// Carregando Rotas da Aplicação
mountRoutes(app)


//Iniciamos o server via node server.js
var server = app.listen(config.confSrv.porta, config.confSrv.endereco, function () {
    var host = server.address().address
    var port = server.address().port
    console.log('Servidor Ativo : http://%s:%s', host, port)
})