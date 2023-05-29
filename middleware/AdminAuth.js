var jwt = require('jsonwebtoken')
var secret = "jfhasdfhaskdhaskdhlasjkzc"

module.exports = function(req, res, next){
    const authToken = req.headers['authorization'];

    if(authToken != undefined){
        const bearer = authToken.split(' ');
        var token  = bearer[1];
        try{
            var decoded = jwt.verify(token, secret);
            if(decoded.role == 1){
                next();
            }else{
                console.log(err)
                res.status(403)
                res.send("Você não possui a permissão necessária")
                return;
            }
        }catch(err){
            console.log(err)
            res.status(403)
            res.send("Você não está autenticado")
            return;
        }
    }else{
        res.status(403)
        res.send("Você não está autenticado")
        return;
    }
}