var db = require('../db/db');

module.exports = {
	register:function(_app){
		_app.get('/getHotel',function(req,res){
			// 获取当前酒店信息的路由
			db.getHotel(req.query,function(result){
				res.send(result);
			})
		});
		_app.get('/getCart',function(req,res){
			db.getCart(req.query,function(result){
				res.send(result);
			})
		})
		_app.get('/getHotGood',function(req,res){
			db.getHotGood(function(result){
				res.send(result);
			})
		})
		_app.get('/getGood',function(req,res){
			// 获取当前酒店信息的路由
			db.getGood(req.query,function(result){
				res.send(result);
			})
		});
		_app.get('/getRoomInformation',function(req,res){
			// 获取当前房间信息的路由
			db.getRoom(req.query,function(result){
				res.send(result);
			})
		});
		_app.get('/createOrder',function(req,res){
			//生成订单写入数据库
			db.createOrder(req.query,function(result){
				console.log(result)
				res.send(result);
			})
		});
		_app.get('/getHotelPic',function(req,res){
			//请求酒店图片
			db.getHotelPic(req.query,function(result){
				res.send(result);
			})
		})
	}
}