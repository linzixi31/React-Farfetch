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
    delete: function(){},

    //2月3日 李阳 获取购物车商品信息
    getCart:function(_data,_cb){
        var sql = `select * from goods as g , 
                    buycart as b , countries as c 
                    where b.status = 0 and b.proId = g.id and g.comefrom = c.country_id and b.userId = ${_data.userId}`;
        db.query(sql,function(err,results,fields){
            if(err){
                _cb({status:false,error:err});
            }else{
                _cb({status:true,data:{results}});
            }
        })
    },
    //2月3日 李阳 删除购物车中的商品
    deleteCartPro:function(_data,_cb){
        // console.log(_data);
        var sql = `update buycart set status = 3 where cart_id = ${_data.delId}`;
        db.query(sql,function(err,results,fields){
            if(err){
                _cb({status:false,error:err});
            }else{
                //删除成功，重新获取商品
                this.getCart(_data,_cb);
            }
        }.bind(this))
    },
    //2月3日 李阳 添加商品到心愿单
    addToWish:function(_data,_cb){
        //商品id和用户id
        var proId = _data.wishId;
        var userId = _data.userId;
        //查询此商品是否已经添加进心愿单
        var sql1 = `select * from userwishes where proId = ${proId} and userId = ${userId}`;
        db.query(sql1,function(err1,results1,fields1){
            if(err1){
                _cb({status:false,error:err1});
            }else{
                //判断未添加，则添加进去
                if(results1.length == 0){
                    var sql2 = `insert into userwishes (proId,userId) values (${proId},${userId})`;
                    db.query(sql2,function(err,results,fields){
                        if(err){
                            _cb({status:false,error:err});
                        }else{
                            _cb({status:true,data:{results}});
                        }
                    })
                }else{
                    _cb({status:true,data:{results:'already exist'}});
                }
            }
        })
    },
    //2月4日 李阳 改变购物车中商品的加够信息
    changecart:function(_data,_cb){
        var changeType = _data.changeType;
        var changeId = _data.changeId;
        var userId = _data.userId;
        var changeRes = _data.res;
        var sql = `update buycart set ${changeType} = '${changeRes}' where cart_id = ${changeId}`;
        // console.log(sql);
            db.query(sql,function(err,results,fields){
            if(err){
                _cb({status:false,error:err});
            }else{
                if(results.affectedRows){
                    this.getCart(_data,_cb);
                }
            }
        }.bind(this))
    }
}