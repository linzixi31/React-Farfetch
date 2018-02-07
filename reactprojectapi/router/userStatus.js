var db = require('../db/db')

module.exports = {
    getUserStatus: function(app,jwt){
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
        app.post('/userDetails', function(req, res){
            var token=req.body.username;
            // console.log(token)
           
              
                var sql="select *  from userlist where email='"+token+"'";
                db.select(sql, function(data){
                   console.log(data)
                   res.send(data);
                })
                
           
        })
        app.post('/orderDetails',function(req,res){
            var userId=req.body.userId
            var sql="select *  from orders , goods,countries where userId='"+userId+"' and orders.cartId=goods.id  and countries.country_id=goods.comefrom";
           
            db.select(sql, function(data){
                   console.log(data)
                   res.send(data);
            })

        })




    },
   
}