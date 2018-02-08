var db = require("../db/db");

module.exports = {
    register:function(app) {
        app.get("/checklist",function (request,response) {
            var userId = request.query.userId;
            var sql = "SELECT * from goods,userwishes WHERE userwishes.proId = goods.id and userwishes.userId =" + userId ;
            db.select(sql,function (result) {
                response.send(result);
            })
        })
    }
}