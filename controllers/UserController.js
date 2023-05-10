const User = require('../models/User');
const { use } = require('../routes/routes');

class UserController{
    async index(req, res){
        var users = await User.findAll();
        res.json(users[0]);

    }

    async findUser(req, res){
        var id = req.params.id
        var user = await User.findById(id)
        if(user == undefined){
            res.status(404)
            res.json({})
        }else{
            res.status(200)
            res.json(user)
        }
    }

    async create(req, res){
        var {email, name, password} = req.body

        if(email == undefined){
            res.status(400)
            res.json({err: "email invalido!!"})
            return;
        }
        var emailExists = await User.findEmail(email)
        if(emailExists){
            res.status(406)
            res.json({err: "email já existe"})
            return;
        }
        await User.new(email, password, name);

        res.status(200)

        res.send("Capturando o corpo da requisição")
    }

    async edit(req, res){
        var {id, name, role, email} = req.body
        var result = await User.update(id, email, name, role)
        if(result != undefined){
            if(result.status){
                res.status(200)
                res.send("Alteração realizada")
            }else{
                res.status(406);
                res.send(result.err)
            }
        }else{
            res.status(406);
            res.send("erro no server")  
        }
        
    }
}

module.exports = new UserController();