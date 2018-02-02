var express = require('express');
var bp = require('body-parser');
var app = express();

app.use(bp.urlencoded({extended: false}));
app.use(bp.json())

var rooms = require('./rooms')
var login = require('./login')
var reg = require('./register')

var jwt = require('jsonwebtoken');
var listPage = require('./listPage')
var homepage = require("./homepage")
var order = require('./order')
var detail = require('./detail');
var hotHotel = require("./hotHotel");
var payment = require('./payment')
var userHotelStatus=require('./userHotelStatus')


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

        rooms.register(app);
        login.register(app,jwt);
        reg.reg(app);
        listPage.select(app); 
        homepage.register(app);
        order.register(app);
        detail.register(app);
        hotHotel.register(app);
        payment.reg(app);
        userHotelStatus.getUserStatus(app);
        
        
        app.listen(_port);
    }
}