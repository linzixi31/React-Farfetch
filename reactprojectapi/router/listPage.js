var db = require('../db/db');

module.exports = {
    select:function(app){
            app.post('/list',function(req,res){
                var sql = "select * from `goods` , `category` where category.cate_id = goods.category and cate_id = "+ req.body.cateId 
                db.select(sql,function(data){
                    res.send(data)
                });
            })
            app.post('/listBrand',function(req,res){
                var sql = "select * from `goods` where  brand = '"+ req.body.brand +"'"
                db.select(sql,function(data){
                    res.send(data)
                });
            })
            app.post('/choseshop',function(req,res){
                var sql = "select * from `goods` , `category` where category.cate_id = goods.category and cate_id = "+ req.body.cateId
                db.select(sql,function(data){
                    console.log(data)
                    res.send(data)
                });
            })
    }
}