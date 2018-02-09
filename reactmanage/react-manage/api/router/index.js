var express = require('express');

var bp = require('body-parser');
var app = express();


app.use(bp.urlencoded({extended: false}));
app.use(bp.json());

var buycart = require('./buycart')
var login = require('./login')
var orders = require('./orders')
var goods = require('./goods')
var userlist = require('./userlist')

module.exports = {
    start: function(_port){

        app.all('*', function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
            res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
            res.header("X-Powered-By",' 3.2.1')
            if(req.method=="OPTIONS") {
                res.send(200);
            } else {
                next();
            }
        });          

        buycart.register(app);
        login.register(app);
        orders.register(app);
        goods.register(app);
        userlist.register(app);
        app.listen(_port);
    }
}