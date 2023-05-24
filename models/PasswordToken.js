const knex = require("../database/connection");
const User = require("./User");
class PasswordToken{
    async create(email){
        var user  =  await User.findByEmail(email)
        if(email != undefined){
            try{
                var token = Date.now()
                await knex.insert({
                    user_id: user.id,
                    used: 0,
                    token: token
                }).table("passwordtokens")
                return {status: true, token: token}
            }catch(err){
                console.log(err)
                return {status: false, err: err}
            }
        }else{
            return {status: false, err: "email não encontrado"}
        }
    }
}

module.exports = new PasswordToken()