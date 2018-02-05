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
    saveCart:function(_data,_cb){
    	//详情页加入购物车
    	let userId = _data.userId;
    	let proId = _data.proId;
    	let user_size = _data.user_size;
    	let qty = _data.qty;
    	let sql = `INSERT INTO  db_farfetch.buycart 
			        (userId,proId,user_size,qty) 
			        VALUES ('${userId}','${proId}','${user_size}','${qty}')`;
    	db.query(sql,function(err,results,fields){
                if(err){
                        _cb({status:false,error:err});
                }else{
                        _cb({status:true,data:{results}});
                }
        })
    },
    selectShouCang:function(_data,_cb){
    	//查询是否有收藏过
    	let userId = _data.userId;
    	let proId = _data.proId;
    	let sql = `SELECT * FROM userwishes WHERE userId = ${userId} and proId = ${proId}`
    	db.query(sql,function(err,results,fields){
                if(err){
                        _cb({status:false,error:err});
                }else{
                        _cb({status:true,data:{results}});
                }
        })
    },
    changeShouCang:function(_data,_cb){
    	//修改收藏状态
    	let userId = _data.userId;
    	let proId = _data.proId;
    	let type = _data.type;
    	let sql = `UPDATE userwishes SET type = ${type} WHERE userId = ${userId} and proId = ${proId}`
    	db.query(sql,function(err,results,fields){
    		if(err){
                    _cb({status:false,error:err});
            }else{
                    _cb({status:true,data:{results}});
            }
    	})
    },
    shouCang:function(_data,_cb){
    	//加入愿望清单
    	let userId = _data.userId;
    	let proId = _data.proId;
    	let type = _data.type;
    	let sql = `INSERT INTO db_farfetch.userwishes
    				(userId,proId,type)
    				VALUES ('${userId}','${proId}','${type}')`;
    	db.query(sql,function(err,results,fields){
                if(err){
                        _cb({status:false,error:err});
                }else{
                        _cb({status:true,data:{results}});
                }
        })
    },
    //2月3日 李阳 获取购物车商品信息
    getCart:function(_data,_cb){
        var sql = `select * from goods as g , 
                    buycart as b , countries as c 
                    where b.status = 0 and b.proId = g.id and g.comefrom = c.country_id and b.userId = ${_data.userId}`;
        db.query(sql,function(err,results,fields){
                if(err){
                        _cb({status:false,error:err});
                }else{
                            console.log(results);
                         _cb({status:true,data:{results}});
                }
        })
    },
    getHotGood:function(_data,_cb){
    	let category = _data.category;
    	//获取当前热门产品
    	var sql = `
    				SELECT id,
    				mainImg,
    				currentPrice,
    				brand
    				FROM goods
    				where hot = '1' and category = ${category}
    				limit 0,4
    				`
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
                }
            }
        })
    },
    getGood:function(_data,_cb){
            //获取当前id的商品信息
        var id = _data.id;
        var sql = `SELECT id,title,currentPrice,mainImg,size,sku,category,brand,descriptions FROM goods where goods.id = ${id}`;
        db.query(sql,function(err,results,fields){
            if(err){
            	_cb({status:false,error:err});
            }else{
                _cb({status:true,data:{results}});
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