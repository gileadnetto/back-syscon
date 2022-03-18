module.exports = app =>{

    function existeOuErro(valor, msg){
        if(!valor) throw msg;

        if(Array.isArray(valor) && valor.length === 0){
            throw msg;
        }

        if(typeof valor ==='string' && !valor.trim()) throw msg
    }

    //contrario do existeouErro
    function naoExisteOuErro(valor, msg){
        try{
            existeOuErro(valor, msg);
        }
        catch(msg){
            return;
        }

        throw msg;
    }

    function igualOuErro(valor1, valor2, msg){
        if(valor1 !== valor2) throw msg;
    }

    return{ existeOuErro, naoExisteOuErro, igualOuErro }
}