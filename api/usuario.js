const bcrypt = require('bcrypt-nodejs');

module.exports = app => {
    
    const { existeOuErro, naoExisteOuErro, igualOuErro } = app.api.validador;

    const encryptSenha = senha => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(senha, salt);
    }

    const salvar = async (req, res) => {
        
        const usuario = {...req.fields };

        if(req.params.id){
            usuario.id = req.params.id;
        }

        //não deixar cadastrar usuario como administrador
        if(!req.originalUrl.startsWith('/usuario')){
            usuario.admin = false;
        }
        //se não tiver usuario e se o usuarui atual n for administrador
        if(!req.user || !req.user.admin){
            usuario.admin = false;
        }

        try{
            existeOuErro(usuario.nome, "Nome não informado")
            existeOuErro(usuario.email, "E-mail não informado")
            existeOuErro(usuario.password, "Senha não informada")
            existeOuErro(usuario.confirmPassword, "Confirmação da Senha não informada")
            igualOuErro(usuario.password, usuario.confirmPassword, "As senha não conferem")

            const usuarioDB = await app.db('usuario')
            .where({email: usuario.email}).first();

            if(!usuario.id){
                naoExisteOuErro(usuarioDB, 'Usuário ja cadastrado')
            }
                
        }
        catch(msg){
           // return res.send(msg)
            return res.status(400).send(msg)
        }

        usuario.password = encryptSenha(usuario.password);
        delete usuario.confirmPassword

        if(usuario.id){
            app.db('usuario')
                .update({
                    nome : usuario.nome,
                    password: usuario.password,
                    email: usuario.email
                })
                .where({id: usuario.id})
                .whereNull('deletadoEm')
                .then( () => res.status(204).send("Atualizado"))
                .catch( err => res.status(500).send(err))
        }
        else{

            usuario['id'] = app.uuidv4().toUpperCase();
            app.db('usuario')
            .insert(usuario)
            .then( _ => res.status(204).send("cadastrado"))
            .catch( err => {console.log() ; res.status(500).send(err)})
        }
    }

    const listar = (req, res) => {
        app.db('usuario')
            .select('id', 'nome', 'email', 'admin')
            .whereNull('deletadoEm')
            .then( usuarios => res.json(usuarios))
            .catch( err => res.status(500).send(err))
    }

    const buscaId = (req, res) => {

        existeOuErro(req.params.id, "Identificador não informado");
        
        app.db('usuario')
            .select('id', 'nome', 'email', 'admin')
            .where({id : req.params.id})
            .first()
            .then( usuario => res.json(usuario))
            .catch( err => res.status(500).send(err))
    }

    //utilizar o soft delet
    const remover = async (req, res) => {

        try{
            const rowsUpdate = await app.db('usuario')
                .update({deletadoEm: new Date()})
                .where({id: req.params.id})

                existeOuErro( rowsUpdate, "Usuario não foi encontrado")

                res.status(204).send("Usuario removido");
        }
        catch(e){
            res.status(400).send(e);
        }
    }

    const limit = 25// usado para paginação
    const usuariosPaginados = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('usuario').count('id as count').first()
        const total = parseInt(result.count)

        app.db('usuario')
            .select('id', 'nome', 'email', 'admin')
            .limit(limit).offset(page * limit - limit)
            .then(usuarios => res.json({ data: usuarios, total, limit }))
            .catch(err => res.status(500).send(err))
    }


    /**
     * 
     * 
     * Outro Sistema
     * 
     * 
     */
    const condominios = (req, res) => {
        app.db('condominio')
            .then( data => res.json(data))
            .catch( err => res.status(500).send(err))
    }

    const contadores = (req, res) => {

        app.db('contadores')
            .then( data => res.json(data))
            .catch( err => res.status(500).send(err))
    }

    const contadorById = (req, res) => {

        existeOuErro(req.params.id, "Identificador não informado");

        app.db('contadores')
        .select('*')
        .where({idcontador : req.params.id})
        .first()
        .then( data => res.json(data))
        .catch( err => res.status(500).send(err))

    }

    
    const locatarios = (req, res) => {

        app.db('locatario')
            .then( data => res.json(data))
            .catch( err => res.status(500).send(err))
    }

    const locatariosByCondominio = (req, res) => {

        existeOuErro(req.params.id, "Identificador não informado");

        app.db('unidades')
        .select('*')
        .where({idcondominio : req.params.id})
        .then( data => res.json(data))
        .catch( err => res.status(500).send(err))
    }


    const cobrancas = (req, res) => {

        app.db('cobranca')
            .then( data => res.json(data))
            .catch( err => res.status(500).send(err))
    }
    
    const cobrancas_reimpressao = (req, res) => {

        app.db('cobranca_reimpressao')
            .then( data => res.json(data))
            .catch( err => res.status(500).send(err))
    }

    const bancos = (req, res) => {

        app.db('bancos')
            .then( data => res.json(data))
            .catch( err => res.status(500).send(err))
    }

    
    const conta_banco = (req, res) => {

        app.db('contabanc')
            .then( data => res.json(data))
            .catch( err => res.status(500).send(err))
    }

    const integrante_corpo_diretivo = (req, res) => {

        app.db('integrantecorpodiretivo')
            .then( data => res.json(data))
            .catch( err => res.status(500).send(err))
    }

    const logs_evt = (req, res) => {

        app.db('logevt')
            .orderBy('iddata', 'desc')
            .orderBy('idhora', 'desc')
            .limit(30)
            .then( data => res.json(data))
            .catch( err => res.status(500).send(err))
    }

    //Movimentacao
    const movctapg = (req, res) => {

        app.db('movctapg')
            .then( data => res.json(data))
            .catch( err => res.status(500).send(err))
    }
    
    return { salvar, listar, buscaId, remover, usuariosPaginados, condominios, contadores, contadorById, locatarios, cobrancas, cobrancas_reimpressao, bancos,conta_banco, integrante_corpo_diretivo, logs_evt, movctapg ,locatariosByCondominio}
}