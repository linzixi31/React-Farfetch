var db = require('../db/db')

module.exports = {
    getUserStatus: function(app){
        app.get('/userHotelStatus', function(req, res){

            console.log(res)
            var sql;
            if(req.query.num){
                sql = "select count(*)  from `order` where status="+req.query.num+" and loginname="+req.query.username;
            }else{
                sql = "select count(*)  from `order` where loginname="+req.query.username;
            }

            
            db.select(sql, function(data){
                   console.log(data)
                   res.send(data);
                
                
                
            })
        });
        app.get('/userDetails', function(req, res){

            console.log(res)
            var sql="select *  from `user` where telephone="+req.query.username;

            db.select(sql, function(data){
                   console.log(data)
                   res.send(data);
                
                
                
            })
        })




    },
   
}