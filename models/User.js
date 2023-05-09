const e = require("express");
const knex = require("../database/connection");
const bcrypt = require("bcrypt");
class User{
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
}

module.exports = new User()