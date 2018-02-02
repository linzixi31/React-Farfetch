var db = require('../db/db')

module.exports = {
    register: function(app,jwt){
        app.get('/login', function(req, res){
            var sql = "SELECT * FROM user";
            db.select(sql, function(data){
                   res.send(data);
                
            })
        })
        app.post('/login', function(req, res){
        	//console.log(req.body)
            var sql = "SELECT * FROM user WHERE telephone = '"+req.body.telephone+"'"+"and password='"+req.body.password +"'";
            db.select(sql, function(data){
            	  if(data.status){
                    var token = jwt.sign({username: req.body.telephone}, 'abc', {
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