var db = require('../db/db');

module.exports = {
    select:function(app){

            app.post('/list',function(req,res){
                var sql = "select * from `goods` , `category` where category.cate_id = goods.category and cate_id = "+ req.body.cateId 
                db.select(sql,function(data){
                    res.send(data)
                });
            })
            app.get('/Brand',function(req,res){
                var sql = "select brand from `goods` "
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
                var sql = "select * from `goods` , `category` where category.cate_id = goods.category and cate_id = "+ req.body.cateId +" LIMIT "+0+','+11
                db.select(sql,function(data){
                    res.send(data)
                });
            })
            app.post('/newest',function(req,res){
                var sql = "select * from `goods` , `category` where category.cate_id = goods.category and cate_id = "+ req.body.cateId +" and newest="+req.body.newest
                db.select(sql,function(data){
                    console.log(data)
                    res.send(data)
                });
            })
            app.post('/orderL',function(req,res){
                var sql = "select * from `goods` , `category` where category.cate_id = goods.category and cate_id = "+ req.body.cateId +" order by currentPrice asc"
                db.select(sql,function(data){
                    console.log(data)
                    res.send(data)
                });
            })
            app.post('/orderT',function(req,res){
                var sql = "select * from `goods` , `category` where category.cate_id = goods.category and cate_id = "+ req.body.cateId +" order by currentPrice desc"
                db.select(sql,function(data){
                    console.log(data)
                    res.send(data)
                });
            })
            app.post('/getstar',function(req,res){
                var sql = "select proId from `userwishes`,`goods`where userwishes.proId = goods.id and userId = "+ req.body.userId 
                db.select(sql,function(data){
                    console.log(data)
                    res.send(data)
                });
            })
            app.post('/setstar',function(req,res){
                if(req.body.type==1){
                    var sql = "INSERT INTO db_farfetch.userwishes (userId,proId,type) VALUES ("+req.body.userId+","+req.body.proId+","+req.body.type+") "
                }else if(req.body.type==0){
                    var sql = "DELETE FROM db_farfetch.userwishes WHERE proId ="+req.body.proId
                }
                
                db.select(sql,function(data){
                    console.log(data)
                    res.send(data)
                });
            })
            app.post('/getBrandlist',function(req,res){
                var sql = "select * from `goods` where  brand  = '"+ req.body.brand +"'"
                db.select(sql,function(data){
                    res.send(data)
                });
            })
    }
}