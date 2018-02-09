var db = require('../db/db')

module.exports = {
    register: function(app){
        app.post('/userlist', function(req, res){
            var page = req.body.page;
            console.log(page);
            var start = (page - 1) * 10;
            var sql = 'SELECT * FROM userlist';
            //连表查询order 和 hotel
            db.select(sql, function(data){
                console.log(data);
                res.send(data);
            })
        }),

        app.post('/deluserlist', function(req, res){

            let sql = `delete from userlist where id = "${req.body.id}"` ;
            db.delete(sql, function(data){
                console.log(data);
                res.send(data);
            })
           
        }),

        app.post('/updatauserlist', function(req, res){
            console.log(req.body.username);
            console.log(req.body.telephone);
            console.log(req.body.id);
            let username = req.body.username;
            let telephone = req.body.telephone;
            let _id = req.body.id;
            let email = req.body.email;
            let sql = `UPDATE userlist SET username="${username}", telephone="${telephone}" , email="${email}" WHERE id="${_id}"`;
            db.updata(sql,function(data){
                console.log(data);
                res.send(data);
            })
        }),

        app.post('/insertuserlist', function(req, res){
            console.log(req.body.name);
            console.log(req.body.telephone);
            console.log(req.body.id);
            let username = req.body.username;
            let telephone = req.body.telephone;
            let password = req.body.password;
            let email = req.body.email;
            let sql = `INSERT INTO userlist ( username,password,telephone,email) VALUES ("${username}", "${password}", "${telephone}","${email}")`;
            db.updata(sql,function(data){
                console.log(data);
                res.send(data);
            })
        })
    }


}