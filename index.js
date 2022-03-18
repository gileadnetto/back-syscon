const app = require('express')();
const consign = require('consign');
const db = require('./config/db');
const { v4: uuidv4 } = require('uuid');



const porta  = 4000; 

app.db = db;
app.uuidv4 = uuidv4;


consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api/validador.js')
    .then('./api')
    .then('./config/rotas.js')
    .into(app)

app.listen(porta, () => {
    console.log('Backend executando na porta '+porta+' ...')
});


