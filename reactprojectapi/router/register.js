var db = require('../db/db')

module.exports = {
    reg: function(app){
        app.post('/register',function(req, res){
           
            var data=req.body;
          console.log(data);
           var sql = "INSERT INTO userlist (username,email,password) VALUES ('"+data.username+"','"+data.email+"','"+data.password+"')";
            db.select(sql,function(result){
               console.log(result)
               
                    res.send(result);
            })
        })
    }
}