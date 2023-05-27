const User = require('../models/User');
const PasswordToken = require("../models/PasswordToken")
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

    async remove(req, res){
        var id = req.params.id;
        var result  = await User.delete(id)
        if(result.status){
            res.status(200)
            res.send("Okay")
        }else{
            res.status(406)
            res.send(result.err)
        }
    }

    async recoverPassword(req, res){
        var email = req.body.email
        var result = await PasswordToken.create(email)
        if(result.status){
            res.status(200)
            console.log(result.token)
            res.send("" + result.token)
        }else{
            res.status(406)
            res.send(result.err)
        }
    }
    async changePassword(req, res){
        var token = req.body.token
        var password = req.body.password
        var isToken = await PasswordToken.validate(token)

        if(isToken.status){
            await User.changePassword(password, isToken.token.user_id, isToken.token.token)
            res.status(200)
            res.send("senha alterada")
        }else{
            res.status(406)
            res.send("Token Inválido!!")
        }

    }
}

module.exports = new UserController();