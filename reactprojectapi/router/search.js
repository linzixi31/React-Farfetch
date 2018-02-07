var db = require('../db/db');

module.exports = {
    reg:function(app){
        app.post('/search',function(req,res){
                var sql = "select * from `goods` where title like '"+req.body.value+"%'"+" LIMIT "+0+','+5
                db.select(sql,function(data){
                    res.send(data)
                });
        })



    }
}