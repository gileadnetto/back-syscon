module.exports = middleware => {

    return (req, res, next) => {
        if(req.usuario.admin){
            middleware(req, res, next);
        }
        else{
            res.status(402).send("Usuario não é administrador");
        }
    }
}