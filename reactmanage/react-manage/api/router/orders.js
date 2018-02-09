var db = require('../db/db')

module.exports = {
    register: function(app){
        app.post('/order', function(req, res){
            var page = req.body.page;
            console.log(page);
            var start = (page - 1) * 10;
            var sql = 'SELECT * FROM db_farfetch.orders limit ' + start + ',10';
            //连表查询order 和 hotel
            db.select(sql, function(data){
                res.send(data);
            })
        }),

        app.post('/delorder', function(req, res){
            console.log(req.body.id)
            let id = req.body.id;
            let sql = `delete from db_farfetch.orders where id = "${req.body.id}"`;
            db.delete(sql, function(data){
                console.log(data);
                res.send(data);
            })
           
        }),

        app.post('/updataorder', function(req, res){
            console.log(req.body.userId);
            console.log(req.body.totalPrice);
            console.log(req.body.cartId);
            console.log(req.body.status);
            let order_id = req.body.orderId;
            let userId = req.body.userId;
            let totalPrice = req.body.totalPrice;
            let cartId = req.body.cartId;
            let status = req.body.status;

            let sql = `UPDATE db_farfetch.orders SET userId='${userId}', totalPrice='${totalPrice}',startTime='${cartId}',status='${status}',totalPrice='${totalPrice}' WHERE order_id='${order_id}'`;
            db.updata(sql,function(data){
                console.log(data);
                res.send(data);
            })
        }),

        app.post('/insertorder', function(req, res){
            console.log(req.body.userId);
            console.log(req.body.totalPrice);
            console.log(req.body.cartId);
            console.log(req.body.status);
            console.log(req.body.totalPrice);
            let userId = req.body.userId;
            let totalPrice = req.body.totalPrice;
            let cartId = req.body.cartId;
            let status = req.body.status;

            let sql = `INSERT INTO db_farfetch.orders ( userId, totalPrice, startTime, status, totalPrice) VALUES ("${userId}", "${totalPrice}","${cartId}", "${status}","${totalPrice}")`;
            db.updata(sql,function(data){
                console.log(data);
                res.send(data);
            })
        })
    }

}