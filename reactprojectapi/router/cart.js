var db = require('./../db/db');

module.exports = {
	register:function(_app){
		//获取购物车信息
		_app.get('/getCartProduct',function(req,res){
			db.getCart(req.query,function(result){
				res.send(result);
			})
		})
		//删除购物车商品（改变状态status = 3）
		_app.post('/deleteCartPro',function(req,res){
			db.deleteCartPro(req.body,function(result){
				res.send(result);
			})
		})
		//从购物车添加到心愿单
		_app.post('/addToWish',function(req,res){
			db.addToWish(req.body,function(result){
				res.send(result);
			})
		})
		//修改购物车中的商品添加信息
		_app.post('/changecart',function(req,res){
			db.changecart(req.body,function(result){
				res.send(result);
			})
		})
	}
}