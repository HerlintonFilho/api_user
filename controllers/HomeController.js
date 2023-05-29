class HomeController{

    async index(req, res){
        res.send("Hello World!!");
    }
    async validate(req, res){
        res.send("Okay")
    }

}

module.exports = new HomeController();