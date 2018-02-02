var db = require("../db/db");

module.exports = {
	register:function(app){
		app.get("/homepage",function(req,res){
			var sql = "select * from hotel";
			db.select(sql,function(result){
				res.send(result);
			})
		})
	}
}
