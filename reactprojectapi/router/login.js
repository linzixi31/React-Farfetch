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
        	//console.log(req.body)
            var sql = "SELECT * FROM userlist WHERE email = '"+req.body.email+"'"+"and password='"+req.body.password +"'";
            db.select(sql, function(data){
               
            	  if(data.status){
                    var token = jwt.sign({username: req.body.email}, 'abc', {
                        'expiresIn':1440,
                    })
                    data.token = token;
                  }
                   console.log(data);
            	   res.send(data);
                
            })
        })
    }
}