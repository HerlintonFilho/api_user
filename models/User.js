const e = require("express");
const knex = require("../database/connection");
const bcrypt = require("bcrypt");
class User{
    async findAll(){
        try{
            var result = await knex.raw(`SELECT id, email, name, role FROM users`)
            return result;
        }catch(err){
            console.log(err)
            return [];
        }
    }

    async findById(id){
        try{
            var result = await knex.raw(`SELECT id, email, name, role FROM users WHERE id = ${id}`)
            console.log(result[0])
            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }
        }catch(err){
            console.log(err)
            return undefined;
        }
    }

    async new(email, password, name){
        try{
            var hash = await bcrypt.hash(password, 10)
            await knex.raw(`INSERT INTO users(email, password, name, role) VALUES('${email}', '${password = hash}','${name}', 0)`);
        }catch(err){
            console.log(err);
        }
    }
    async findEmail(email){
        try{
            var response = await knex.select("*").from("users").where({email: email})
            if(response.length > 0){
                return true;
            }else{
                return false;
            }
        }catch(err){
            console.log(err)
            return false
        }
    }
    async update(id, email, name, role){
        var user = await this.findById(id)
        if(user != undefined){
            var editUser = {};
            if(email != undefined){
                if(email != user.email){
                    var result =  await this.findEmail(email)
                    if(result == false){
                        editUser.email = email
                    }else{
                        return {status: false, err: "Email já cadastrado"}
                    }
            }
            }
            if(name != undefined){
                editUser.name = name
            }

            if(role != undefined){
                editUser.role = role
            }

            try{
                await knex.update(editUser).where({id: id}).table("users")
                return {status: true}
            }catch(err){
                console.log(err);
                return false;
            }
        }else{
            return {status: false, err: "Usuario não encontrado"}
        }
    }
}

module.exports = new User()