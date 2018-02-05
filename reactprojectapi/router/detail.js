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
			//获取当前购物车信息的路由
			db.getCart(req.query,function(result){
				res.send(result);
			})
		})
		_app.get('/getHotGood',function(req,res){
			//获取热门商品的路由
			db.getHotGood(req.query,function(result){
				res.send(result);
			})
		})
		_app.get('/saveCart',function(req,res){
			//存入购物车的路由
			db.saveCart(req.query,function(result){
				res.send(result);
			})
		})
		_app.get('/checkShouCang',function(req,res){
			//检查收藏
			db.selectShouCang(req.query,function(result){
				console.log(result)
				var type = 0 ;
				if(result.data.results.length > 0){
					type = result.data.results[0].type;
					res.send({status:true,type:type});
				}else{
					res.send({status:true,type:0});
				}
			})
		})
		_app.get('/shouCang',function(req,res){
			//先判断是否曾加入愿望清单
			db.selectShouCang(req.query,function(result){
				if(result.data.results.length > 0){
					req.query.type = (result.data.results[0].type == 1) ? 0 : 1;
					//取消原有收藏状态
					db.changeShouCang(req.query,function(changeResult){
						res.send(changeResult);
					})
				}else{
					//存入愿望清单的路由
					db.shouCang(req.query,function(saveResult){
						res.send(saveResult);
					})
				}
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