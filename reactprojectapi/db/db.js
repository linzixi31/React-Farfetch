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
    },
    //2月5日 李阳 添加地址到数据库
    addaddress:function(_data,_cb){
        
        //提前地址二和地址三（可能为空
        var addr2 = _data['addr[addr_second]'] || '';
        var addr3 = _data['addr[addr_third]'] || '';

        var sql = `insert into useraddress 
                (userId,lastname,firstname,country,province,city,addr_one,addr_second,addr_third,zipCode,tele)
                values (${_data.userId},'${_data['addr[lastname]']}','${_data['addr[firstname]']}','${_data['addr[country]']}',
                '${_data['addr[province]']}','${_data['addr[city]']}','${_data['addr[addr_one]']}',
                '${addr2}','${addr3}',${_data['addr[zipCode]']},${_data['addr[tele]']})`;
        db.query(sql, function(error, results){
            if(error){
                _cb({status: false, error: error})
            } else {
                _cb({status: true, data: {results}});
            } 
        })
    },
    //2月5日 李阳 生成订单写入数据库
    createorder:function(_data,_cb){
        
        var userId = _data.userId;
        var cartIds = _data.cartIds;
        var addrId = _data.addrId;
        var orders = JSON.parse(_data.orderCates);
        // console.log(orders);
        //生成订单的sql(同时生产多个订单)
        var sql = orders.map(function(item){
            return `insert into orders (userId,totalPrice,cartId,delivery_country,addr_id) values (${userId},${item.totalPrice},'${item.proids}','${item.country}',${addrId});`
        }).join('');

        sql += "update buycart set status = 1 where cart_id in (" + cartIds + ");";
        // console.log(sql);
         db.query(sql, function(error, results){
            if(error){
                _cb({status: false, error: error})
            } else {
                _cb({status: true, data: {results}});
            } 
        })
    },
    //2月5日 李阳 获取当前用户订单信息
    getorders:function(_data,_cb){
        var userId = _data.userId;
        var orderIds = _data.orderIds;
        //查询订单和地址
        var sql = `select * from orders where status = 0 and userId = ${userId} and order_id in (${orderIds});
                select * from useraddress where defaultAddr = 1 and userId = ${userId};`;
                
        db.query(sql, function(error, results){
            if(error){
                _cb({status: false, error: error})
            } else {
                _cb({status: true, data: {results}});
            } 
        })
    },
    //2月6日 李阳 获取当前用户所有地址
    getaddresses:function(_data,_cb){
        // console.log(_data)
        var sql = '';
        if(_data.defaultAddr != 1){
            sql = `select * from useraddress where userId = ${_data.userId}`;
        }else if(_data.defaultAddr == 1){
            sql = `select * from useraddress where userId = ${_data.userId} and defaultAddr = '1'`;
        }

        db.query(sql, function(error, results){
            if(error){
                _cb({status: false, error: error})
            } else {
                _cb({status: true, data: {results}});
            } 
        })
    },
    //2月6日 李阳 改变当前用户的默认地址
    changedefaultaddr:function(_data,_cb){
        var sql = `update useraddress set defaultAddr = 0 where userId = ${_data.userId};
                update useraddress set defaultAddr = 1 where userId = 1 and addr_id = ${_data.changeId};`;
        db.query(sql, function(error, results){
            if(error){
                _cb({status: false, error: error})
            } else {
                _cb({status: true, data: {results}});
            } 
        })      
    }
}