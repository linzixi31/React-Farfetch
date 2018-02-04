var db = require('../db/db');

module.exports = {
    select:function(app){
            app.post('/list',function(req,res){
                var sql = "select * from `goods` , `category` where category.cate_id = goods.category and cate_id = "+ req.body.cateId 
                db.select(sql,function(data){
                    res.send(data)
                });
            })
    }
}