var mysql = require('mysql');

var  db = mysql.createPool({
    connectionLimit: 10,
    host: "10.3.136.15",
    user: 'root',
    password: '',
    database: 'db_farfetch',
    multipleStatements: true
});

module.exports = {
    select: function(_sql, _callback){
        db.query(_sql, function(error, results, fields){
            if(error){
                _callback({status: false, error: error})
            } else {
                _callback({status: true, data: {results, fields}});
            }
            
        })
    },
    insert: function(_sql, _callback){
        db.query(_sql, function(error, results, fields){
            if(error){
                _callback({status: false, error: error})
            } else {
                _callback({status: true, data: {results, fields}});
            }
            
        })
    },
    delete: function(_sql,_callback){
        db.query(_sql, function(error, results, fields){
            if(error){
                _callback({status: false, error: error})
            } else {
                _callback({status: true, data: {results, fields}});
            }
            
        })
    },
    updata: function(_sql,_callback){
        db.query(_sql, function(error, results, fields){
            if(error){
                _callback({status: false, error: error})
            } else {
                _callback({status: true, data: {results, fields}});
            }
            
        })
    },
    getHotelRoom:function(_data,_callback){
            //获取当前id的酒店信息
            var id = _data.hotelId;
            var sql = 'SELECT a.hotelName,a.stars,a.address,b.type,b.znePrice FROM hotel AS a,room AS b where a.id=b.hotelId and a.id=' + id;
            
            db.query(sql,function(err,results,fields){
                if(err){
                        _cb({status:false,error:err});
                }else{
                         _cb({status:true,data:{results,fields}});
                }
            })
    }
}