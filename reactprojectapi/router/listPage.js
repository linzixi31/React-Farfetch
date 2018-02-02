var db = require('../db/db');

module.exports = {
    select:function(app){
        app.get('/listPage',function(request,response){
        	var sql = `
                     SELECT hotelName,
                    		stars,
                    		address,
                    		enghotelName,
                    		image1,
                    		id,
                    		score,
                    		minPrice
                    		FROM hotel
							`;
            db.select(sql,function(data){
                if(data.status){
                    response.send(data);
                }else{
                    response.send(data);
                }
            })
        }),
        app.get('/listPageReceive',function(request,response){
        	var condition = request.query;
        	var add = request.query.add;
        	var hotelName = request.query.hotelName;
        	console.log(add,hotelName);
        	var sql = `select hotelName,
                    		stars,
                    		address,
                    		enghotelName,
                    		image1,
                    		id,
                    		score,
                    		minPrice
                    		from hotel where address like "%${add}%" and hotelName like "%${hotelName}%"`;
        	db.select(sql,function(data){
        		//console.log(data);
        		if(data.status){
        			response.send(data);
        		}else{
                    response.send(data);
                }
        	})
        })
        app.get('/upDataList',function(request,response){
        	var condition = request.query;
        	console.log(request.query);
        	var stars = request.query.stars;
        	var price = request.query.price;
        	var sql;
        	if(stars == 'all' || !stars){
        		sql = `select hotelName,
                    		stars,
                    		address,
                    		enghotelName,
                    		image1,
                    		id,
                    		score,
                    		minPrice from hotel where minPrice>${price}`;
        	}else{
        		sql = `select hotelName,
                    		stars,
                    		address,
                    		enghotelName,
                    		image1,
                    		id,
                    		score,
                    		minPrice from hotel where stars = ${stars} and minPrice>${price}`;
        	}
        	db.select(sql,function(data){
        		console.log(data);
        		if(data.status){
                    response.send(data);
                }else{
                    response.send(data);
                }
        	})
        }),
        app.get('/sort',function(request,response){
        	var value = request.query.order;
        	var sql = '';
        	console.log(value);
        	var comment = `hotelName,stars,address,enghotelName,image1,id,score,minPrice`;
        	if(value == 'priceUp'){
        		sql = `select ${comment} from hotel order by minPrice asc`;
        	}else if(value == 'priceDown'){
        		sql = `select ${comment} from hotel order by minPrice desc`;
        	}else if(value == 'score'){
        		sql = `select ${comment} from hotel order by score asc`;
        	}else if(value == 'starDown'){
        		sql = `select ${comment} from hotel order by stars desc`;
        	}else{
        		sql = `select ${comment} from hotel order by stars asc`;
        	}
        	
        	db.select(sql,function(data){
        		console.log(data);
        		if(data.status){
                    response.send(data);
                }else{
                    response.send(data);
                }
        	})
        }),
        app.get('/shaixuan',function(request,response){
        	var sql = '';
        	var score = request.query.score;
        	var equ = JSON.parse(request.query.equipment);
        	var condition = ''
        	console.log(equ)
//      	equ.forEach(function(item){
//      		if(item.type == 1){
//      			condition += item.value + '= 1 and';
//      			console.log(111);
//      		}
//      	})
        	for(var i=0; i<equ.length;i++){
        		if(equ[i].type == 1){
        			condition += equ[i].value + '= 1 and ';
        			console.log(111);
        		}
        	}
        	console.log(condition)
        	condition = condition.slice(0,-4);
        	console.log(condition)
        	var comment = `hotelName,stars,address,enghotelName,image1,id,score,minPrice`;
        	if(score == ''){
        		score = 'all';
        	};
        	if(condition == ''){
        		condition = 'all';
        	};
        	if((score == 'all') && (condition == 'all')){
        		sql = `select ${comment} from hotel`
        	}else if(score == 'all' && (condition != 'all')){
        		sql = `select ${comment} from hotel where ${condition}`
        	}else if(score != 'all' && (condition == 'all')){
        		sql = `select ${comment} from hotel where score > ${score}`
        		console.log(score,'大于分数');
        	}else{
        		sql = `select ${comment} from hotel where score > ${score} and ${condition}`
        	}
        	console.log(sql);
        	db.select(sql,function(data){
        		console.log(data);
        		if(data.status){
                    response.send(data);
                }else{
                    response.send(data);
                }
        	})
        }),
        app.get('/publicSearch',function(request,response){
        	var data = request.query.data;
        	console.log(data);
        	var sql = `select * from hotel where hotelName like '%${data}%'`
        	db.select(sql,function(res){
        		console.log(res);
        		if(res.status){
        			response.send(res);
        		}else{
        			response.send(res);
        		}
        	})
        }),
        app.get('/userHistory',function(request,response){
			var username = request.query.username;
			var hName = request.query.hName;
			var date = request.query.date;
			console.log(request.query);
			db.createHistory(request.query,function(data){
				response.send(data);
			})
		}),
		app.get('/getHistory',function(request,response){
			db.getHistory(request.query,function(data){
				response.send(data);
			})
		}),
		app.get('/searchId',function(request,response){
			db.getId(request.query,function(data){
				response.send(data);
			})
		})
    }
}