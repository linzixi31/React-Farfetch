var db = require('../db/db');

module.exports = {
    reg:function(app){
        app.post('/payment',function(req,res){
            //console.log(req.body);
            var sql = 'select * from `order` ,`hotel` where order.hotelId = hotel.Id and order.orderId="'+req.body.id+'"'
            db.select(sql,function(results){
                //console.log(results)
                res.send(results)
            });
        })
        app.post('/changeStatus',function(req,res){
            //console.log(req.body);
            
            db.updateStatus(req.body,function(results){
                res.send(results)
            })
        })

    }
}