var db = require('../db/db');

module.exports = {
    reg:function(_app){
    	//添加收货地址
        _app.post('/addaddress',function(req,res){
            db.addaddress(req.body,function(result){
                res.send(result);
            })
        })
        //获取订单
        _app.post('/getorders',function(req,res){
        	db.getorders(req.body,function(result){
                res.send(result);
            })
        })
        //获取所有收货地址
        _app.get('/getaddresses',function(req,res){
            db.getaddresses(req.query,function(result){
                res.send(result);
            })
        })
        //生成订单
        _app.post('/createorder',function(req,res){
            db.createorder(req.body,function(result){
                res.send(result);
            })
        })
        //改变默认地址
        _app.post('/changedefaultaddr',function(req,res){
             db.changedefaultaddr(req.body,function(result){
                res.send(result);
            })
        })
    }
}