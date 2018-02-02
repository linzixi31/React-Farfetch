var mysql = require('mysql');

var  db = mysql.createPool({
    connectionLimit: 10,
    host: "10.3.136.15",
    user: 'root',
    password: '',
    database: 'db_hotel',
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
    updateStatus: function(_data,_cb){
        //更新订单状态(待出行)
        console.log(_data)
        var id = _data.orderId
        //数据类型坑人 还必须用字符串拼接
        var sql = "UPDATE `order` SET status = 1 WHERE orderId = '"+ id +"'"

                    
        db.query(sql,function(err,results,fields){
                if(err){
                        _cb({status:false,error:err});
                }else{
                            console.log(results);
                         _cb({status:true,data:{results}});
                }
        })
    },
    getHotel:function(_data,_cb){
            //获取当前id的酒店房间信息
            var id = _data.hotelId;
            var sql = `
                                 SELECT a.hotelName,
                                a.stars,
                                a.address,
                                a.enghotelName,
                                a.hasbreakfast,
                                a.image1,
                                a.kindDescription,
                                b.id,
                                b.type,
                                b.znePrice,
                                b.availablePerson,
                                b.cancelAllow,
                                b.bedScale
                                FROM hotel AS a,room AS b 
                                where a.id=b.hotelId and a.id=${id}`;

            db.query(sql,function(err,results,fields){
                    if(err){
                            _cb({status:false,error:err});
                    }else{
                                // console.log(results);
                             _cb({status:true,data:{results}});
                    }
            })
    },
    getHotelRoom:function(_data,_cb){
            console.log(_data);
            //获取当前id的酒店信息
            var id = _data.hotelId;
            var cancel = _data.cancelAllow;
            var sql = `SELECT id,type,znePrice,availablePerson,cancelAllow,bedScale FROM room where room.hotelId = ${id} and room.cancelAllow = ${cancel}`;
            
            db.query(sql,function(err,results,fields){
                if(err){
                        _cb({status:false,error:err});
                }else{
                            // console.log(results);
                         _cb({status:true,data:{results}});
                }
            })
    },
    getRoom:function(_data,_cb){
            //获取当前房间信息
            var id = _data.roomId;
            var hotelId = _data.hotelId;

            var sql = `select a.hotelName,a.address,b.type,b.znePrice,b.bedScale from hotel AS a,room AS b where a.id=b.hotelId and a.id=${hotelId} and b.id=${id}`;
            db.query(sql,function(err,results,fields){
                if(err){
                        _cb({status:false,error:err});
                }else{
                            // console.log(results);
                         _cb({status:true,data:{results}});
                }
            })
    },
    createOrder:function(_data,_cb){
            //生成订单号
            var orderId = _data.orderTime + _data.startTime + _data.room_id + _data.hotel_id;
            var order_id = '';
            for(var val of orderId){
                if(!isNaN(val * 1) && val != ' '){
                        order_id  += val;
                }
            };

            // 生成订单
            var sql = `
                    INSERT INTO  db_hotel.order 
                    ( hotelId,  linkman, telephone, totalPrice, roomId, startTime, endTime, orderId, livingPeriod,loginname,createTime,failureTime) 
                    VALUES (${_data.hotel_id},'${_data.linkman}','${_data.telephone}','${_data.price}', '${_data.room_id}', '${_data.startTime}',
                     '${_data.endTime}', '${order_id}','${_data.night}','${_data.loginer}','${_data.orderTime}','${_data.failureTime}')`;
            
             db.query(sql,function(err,results,fields){
                    if(err){
                            _cb({status:false,error:err});
                    }else{
                             _cb({status:true,data:{results},orderId:order_id});
                    }
                })
    },
    getHotelPic:function(_data,_cb){
        var sql = `select * from hotel where id= ${_data.hotelId}`;
        db.query(sql,function(err,results,fields){
                if(err){
                        _cb({status:false,error:err});
                }else{
                         _cb({status:true,data:{results}});
                }
            })
    },
    createHistory:function(_data,_cb){
    	var sql = `
	        INSERT INTO  db_hotel.userhistory 
	        (username,hName) 
	        VALUES ('${_data.username}','${_data.hName}')`;
        db.query(sql,function(err,results,fields){
            if(err){
                _cb({status:false,error:err});
            }else{
                _cb({status:true,data:{results}});
            }
        })
    },
    getHistory:function(_data,_cb){
    	var sql = `select * from userhistory where username = ${_data.username}`;
    	db.query(sql,function(err,results,fields){
    		if(err){
    			_cb({status:false,error:err});
    		}else{
    			_cb({status:true,data:{results}});
    		}
    	})
    },
    getId:function(_data,_cb){
    	var sql = `select id from hotel where hotelName = "${_data.hotelName}"`;
    	db.query(sql,function(err,results,field){
    		if(err){
    			_cb({status:false,error:err});
    		}else{
    			_cb({status:true,data:{results}});
    		}
    	})
    }
}