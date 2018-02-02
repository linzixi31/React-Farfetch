var db = require('../db/db')

module.exports = {
    reg: function(app){
        app.get('/register',function(req, res){
            var data=req.query;
          console.log(data);
           var sql = "INSERT INTO user (telephone,password) VALUES ('"+data.telephone+"','"+data.password+"')";
            db.select(sql,function(result){
                //console.log(result)
                if(result.status){
                    //console.log(666)
                    res.send('sucess');
                }else{
                    res.send('fail');
                }
            })
        })
    }
}