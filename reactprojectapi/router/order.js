var db = require('../db/db')

module.exports = {
    register: function(app){
        app.post('/order', function(req, res){
            //查询语句坑人 表名要加 ``
            //console.log(req.body)
            var sql ="select * from `order`,`hotel` where order.hotelId = hotel.Id and loginname='"+ req.body.name+"'order by status asc";
            //连表查询order 和 hotel
            db.select(sql, function(data){
                //console.log(data)
                res.send(data);
            })
        })
    }
}