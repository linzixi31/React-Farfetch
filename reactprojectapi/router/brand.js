var db = require('../db/db');

module.exports = {
	register:function(_app){
		_app.get('/getBrand',function(req,res){
			db.getBrand(req.query,function(result){
				res.send(result);
			})
		})
	}
}
