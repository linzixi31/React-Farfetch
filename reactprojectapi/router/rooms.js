var db = require('../db/db')

module.exports = {
    register: function(app){
        app.get('/getschedule', function(req, res){
            var date = req.query.date;
            var page = req.query.page * 1;
            var limit = req.query.limit * 1;
            var sql = `
            select
                SQL_CALC_FOUND_ROWS
                *
            from
                rooms
                inner join roomtype on rooms.type = roomtype.indexid
                inner join schedule on rooms.indexid = schedule.roomid
            limit ${(page - 1) * limit}, ${limit};
            select FOUND_ROWS() as rowscount;`;
            db.select(sql, function(data){
                res.send(data);
            })
        })
        app.post('/book', function(req, res){})
    }
}