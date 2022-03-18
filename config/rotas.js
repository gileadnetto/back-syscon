//sem o consign
//const usuario = require('../api/usuario');

// é usado para endopint onde apenas o adminis pode acessar 
const admin = require('./admin');
//Exemplo do uso so envolver o middle com o admin
// .post(admin(app.api.usuario.salvar))

module.exports = app => {
    //sem o consign  
    //app.route('/usuarios').post(usuario.salvar);


    app.post('/singup', app.api.usuario.salvar)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/condominios')
        .get(app.api.usuario.condominios)

    app.route('/locatarios')
        .get(app.api.usuario.locatarios)

    app.route('/locatarios/:id')
        .get(app.api.usuario.locatariosByCondominio)

    app.route('/contadores')
        .get(app.api.usuario.contadores)

    app.route('/contadores/:id')
        .get(app.api.usuario.contadorById)

    app.route('/cobrancas')
        .get(app.api.usuario.cobrancas)

    app.route('/cobrancas_reimpressao')
        .get(app.api.usuario.cobrancas_reimpressao)

    app.route('/bancos')
        .get(app.api.usuario.bancos)

    app.route('/conta_banco')
        .get(app.api.usuario.conta_banco)

    app.route('/integrante_diretivo')
        .get(app.api.usuario.integrante_corpo_diretivo)

    app.route('/logs')
        .get(app.api.usuario.logs_evt)

    app.route('/movimentacoes')
        .get(app.api.usuario.movctapg)






    app.route('/usuarios')
        // .all(app.config.passport.authenticate())
        .post(app.api.usuario.salvar)
        .get(app.api.usuario.listar)

    app.route('/usuarios/:id')
        .all(app.config.passport.authenticate())
        .post(app.api.usuario.salvar)
        .get(app.api.usuario.buscaId)
        .delete(app.api.usuario.remover)

    app.route('/produtos')
        .post(app.api.produto.salvar)
        .get(app.api.produto.listar)

    app.route('/produtos/:id')
        .delete(app.api.produto.remover)

    app.route('/teste')
        .get(app.api.usuario.usuariosPaginados)
}