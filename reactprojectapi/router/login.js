var db = require('../db/db')

module.exports = {
    register: function(app,jwt){
        app.post('/getUser', function(req, res){
            var sql = "SELECT * FROM userlist";
            db.select(sql, function(data){
                   res.send(data);
                   console.log(data)
                
            })
        })
        app.post('/login', function(req, res){
        	console.log(req.body.username,req.body.password)
            var sql = "SELECT * FROM userlist WHERE email = '"+req.body.username+"'"+"and password='"+req.body.password +"'";
            db.select(sql, function(data){
                
            	  if(data.status){
                    res.send(data)
                  }else{
                    res.send(data)
                  }
                console.log(data);
            })
        })
    }
}