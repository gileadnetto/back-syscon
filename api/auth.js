const { authSecret } = require('../.env');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt-nodejs');

module.exports = app => {

    const signin = async (req, res) => {

        if( !req.fields.email || !req.fields.password){
            return res.status(400).send('Informe usuário e a senha!.')
        }

        const usuario = await app.db('usuario')
            .where({email : req.fields.email})
            .first()

        //se n tem achou o usuario 
        if( !usuario ) return res.status(400).send("Usuário não encontrado");

        const isMatch = bcrypt.compareSync(req.fields.password, usuario.password);

        //se a senha n conferem
        if(!isMatch) return res.status(401).send("Senha inválida !");

        const now = Math.floor(Date.now() / 1000);

        const payload = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            admin: usuario.admin,
            criadoEm: now,
            expiraEm: now + (60 * 60 * 24 * 3) // 3 dias para expirar  
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })

    }

    const validateToken =  async (req, res) => {
        const userData = req.fields || null;

        try{
            if(userData){
                const token = jwt.decode(userData.token, authSecret)

                if(new Date(token.expiraEm * 1000) > new Date()){
                    return res.send(true);
                }
            }
        }
        catch(e){
            
        }

        res.send(false);
    }

    return {signin, validateToken}
}