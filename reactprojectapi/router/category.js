var db = require('../db/db');

module.exports = {
    register:function(app){
        app.get('/category',function(req,res){
            console.log(req.query)
            var sql = "select * from `category` where catesex = '"+req.query.tab+"'"
            db.select(sql,function(data){
                console.log(data)
                res.send(data)
            })
        })
    }

}