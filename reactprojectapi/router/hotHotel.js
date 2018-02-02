var db = require("../db/db");

module.exports = {
	register:function(app){
		app.get("/hotHotel",function(req,response){
			var sql = "select * from hotel";
			db.select(sql,function(result){
				response.send(result);
			})
		})
	}
}
