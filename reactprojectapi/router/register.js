var db = require('../db/db')

module.exports = {
    reg: function(app){
        app.post('/register',function(req, res){
           
            var data=req.body;

          console.log(data);
          var query="SELECT * FROM userlist WHERE email = '"+data.email+"'";
          db.select(query,function(sum){
              console.log(sum)
              if(sum.data.results.length>0){
                console.log(666)
                res.send({data:''})

              }else{
                  var sql = "INSERT INTO userlist (username,email,password) VALUES ('"+data.username+"','"+data.email+"','"+data.password+"')";
                  db.select(sql,function(result){

                      console.log(result)
                      res.send(result);
                      
                  })
              }
          })


        })



           
    }
}