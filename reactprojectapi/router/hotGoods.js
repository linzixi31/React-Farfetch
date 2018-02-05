var db = require("../db/db");

module.exports = {
	register:function(app){
		app.get("/hotGoods",function(req,response){
			var sql = "select * from goods where hot = 1 limit 6";
			db.select(sql,function(result){
				response.send(result);
			})
		}),
		app.get("/getOff",function(request,response){
			var sql = "select * from goods where brand = 'Off-White' and hot = 1 limit 3 " ;
			db.select(sql,function(result){
				response.send(result);
			})
		}),
		app.get("/getYsl",function(request,response){
			var sql = "select * from goods where brand = 'Saint Laurent' and hot = 1 limit 3";
			db.select(sql,function(result){
				response.send(result);
			})
		}),
		app.get("/getGucci",function(request,response){
			var sql = "select * from goods where brand = 'gucci' limit 3";
			db.select(sql,function(result){
				response.send(result);
			})
		}),
		app.get("/getOther",function(request,response){
			var sql = "select * from goods where seasonRecommend = 1 limit 3";
			db.select(sql,function(result){
				response.send(result);
			})
		})
		
	}
}
