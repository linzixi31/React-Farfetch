var db = require('../db/db')

module.exports = {
    register: function(app){
        app.post('/login', function(req, res){
            let username = req.body.username;
            let password = req.body.password;
            let sql = `SELECT * FROM userlist`;
            db.select(sql, function(data){
                console.log(data);
                res.send(data);
            })
        })

        app.post('/reg', function(req, res){
            let username = req.body.username;
            let password = req.body.password;
            let sql = `INSERT INTO userlist (username, password) VALUES ("${username}","${password}")`;
            db.updata(sql, function(data){
                console.log(data);
                res.send(data);
            })
        })
    }
}