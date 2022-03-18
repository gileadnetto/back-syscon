const fs = require('fs');

module.exports = app => {
    
    const { existeOuErro, naoExisteOuErro, igualOuErro } = app.api.validador;

    const salvar = async (req, res) => {
        
        const produto = {...req.fields};

        //obtendo imagem
        if(typeof req.files.imagem !== "undefined" ){
            // console.log(req.files.imagem.type.match('/^(pjpeg|jpeg|png|gif|bmp|jpg)$/gm'));
            // if (!req.files.imagem.type.match('/(pjpeg|jpeg|png|gif|bmp|jpg)/gm')) {
            //     return res.status(400).send('Não é imagem');
            // }
            produto.imagem = req.files.imagem.name;
        }

        if(req.params.id){
            produto.id = req.params.id;
        }

        try{
            existeOuErro(produto.nome, "Nome não informado")
            existeOuErro(produto.detalhes, "Detalhes não informado")
            existeOuErro(produto.precoSugerido, "Preço não não informado")
        }
        catch(e){
            //removendo arquivo
            if(typeof req.files.imagem !== "undefined" ){
                fs.unlinkSync(req.files.imagem.path);
            }

            return res.status(400).send(e);
        }
      
        


        if(produto.id){
            app.db('produto')
                .update(produto)
                .where({id: usuario.id})
                .whereNull('deletadoEm')
                .then( () => res.status(204).send("Atualizado"))
                .catch( err => res.status(500).send(err))
        }
        else{
           
            produto['id'] = app.uuidv4().toUpperCase();
            app.db('produto')
            .insert(produto)
            .then( _ => res.status(204).send("cadastrado"))
            .catch( err => {res.status(500).send(err)})
        }
    }

    const limit = 25// usado para paginação
    const listar = async (req, res) => {
        const page = req.query.page || 1

        const result = await app.db('produto').count('id as count').first().where({status: 1})

        const total = parseInt(result.count)

        app.db('produto')
        .select('produto.*', { criadoPor: 'usuario.email' })
            .limit(limit).offset(page * limit - limit)
            .leftJoin('usuario', 'usuario.id', 'produto.criadoPor')
            .where({status:1})
            .then( produto => res.json({ data: produto, total, limit }))
            .catch(err => res.status(500).send(err))
    }

    const buscaId = (req, res) => {

        existeOuErro(req.params.id, "Identificador não informado");
        
        app.db('produto')
        .select('id', 'nome', 'detalhes', 'precoSugerido', 'imagem')
            .where({id : req.params.id})
            .first()
            .then( usuario => res.json(usuario))
            .catch( err => res.status(500).send(err))
    }

    //utilizar o soft delet
    const remover = async (req, res) => {

        try{
            const rowsUpdate = await app.db('produto')
                .update({status:2})
                .where({id: req.params.id})

                existeOuErro( rowsUpdate, "produto não foi encontrado")

                res.status(204).send("produto removido");
        }
        catch(e){
            res.status(400).send(e);
        }
    }

  
    
    return { salvar, listar, buscaId, remover }
}