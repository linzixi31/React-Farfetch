var db = require('../db/db')

module.exports = {
    register: function(app){
        app.post('/goods/select', function(req, res){
            var page = req.body.page;
            console.log(page);
            var start = (page - 1) * 15;
            var sql = 'SELECT * FROM goods';
            //连表查询goods 和 hotel
            db.select(sql, function(data){
                res.send(data);
            })
        }),

        app.post('/goods/delete', function(req, res){
            console.log(req.body.id)
            let id = req.body.id;
            let sql = `delete from db_farfetch.goods where id = "${req.body.id}"`;
            db.delete(sql, function(data){
                console.log(data);
                res.send(data);
            })
           
        }),

        app.post('/goods/updata', function(req, res){
            console.log(req.body.title);
            console.log(req.body.currentPrice);
            console.log(req.body.brand);
            console.log(req.body.mainImg);
            console.log(req.body.size);
            let id = req.body.id;
            let title = req.body.title;
            let currentPrice = req.body.currentPrice;
            let brand = req.body.brand;
            let mainImg = req.body.mainImg;
            let size = req.body.size;

            let sql = `UPDATE db_farfetch.goods SET title='${title}', currentPrice='${currentPrice}',brand="${brand}" WHERE id='${id}'`;
            db.updata(sql,function(data){
                console.log(data);
                res.send(data);
            })
        }),

        app.post('/goods/insert', function(req, res){
            console.log(req.body.title);
            console.log(req.body.currentPrice);
            console.log(req.body.brand);
            console.log(req.body.mainImg);
            console.log(req.body.size);
            
            let title = req.body.title;
            let currentPrice = req.body.currentPrice;
            let brand = req.body.brand;
            let mainImg = req.body.mainImg;
            let size = req.body.size;
            
            let sql = `INSERT INTO db_farfetch.goods ( title, currentPrice, mainImg, size, brand) VALUES ("${title}", "${currentPrice}","${mainImg}", "${size}","${brand}")`;
            db.updata(sql,function(data){
                console.log(data);
                res.send(data);
            })
        })
    }

}