var db = require('../db/db')

module.exports = {
    register: function(app){
        app.post('/buycart', function(req, res){
            var page = req.body.page;
            console.log(page);
            var start = (page - 1) * 10;
            var sql = 'SELECT * FROM buycart limit ' + start + ',10';
            //连表查询order 和 hotel
            db.select(sql, function(data){
                console.log(data);
                res.send(data);
            })
        }),

        app.post('/delbuycart', function(req, res){

            let sql = `delete from buycart where cart_id = "${req.body.cart_id}"` ;
            db.delete(sql, function(data){
                console.log(data);
                res.send(data);
            })
           
        }),

        app.post('/updatabuycart', function(req, res){
            console.log(req.body.color);
            console.log(req.body.user_size);
            console.log(req.body.status);
            console.log(req.body.qty);

            let color = req.body.color;
            let user_size = req.body.user_size;
            let status = req.body.status;
            let qty = req.body.qty;
            
            let sql = `UPDATE buycart SET color="${color}", user_size="${user_size}" ,qty="${qty}" ,status="${status}" WHERE cart_id="${cart_id}"`;
            db.updata(sql,function(data){
                console.log(data);
                res.send(data);
            })
        })


    }


}