var db = require("../db/db");

module.exports = {
    register:function(app) {
        app.get("/chekclist",function (request,response) {
            var sql  = "select * from userwishes";
            db.select(sql,function (result) {
                response.send(result);
            })
        })
    }
}