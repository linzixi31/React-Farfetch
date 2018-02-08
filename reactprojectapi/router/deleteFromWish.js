var db = require("../db/db");

module.exports = {
    register:function(app){
        app.post("/delPro",function (request,response) {
            db.delFromWish(request.body,function(result){
                response.send(result);
            })
        })
    }
}
