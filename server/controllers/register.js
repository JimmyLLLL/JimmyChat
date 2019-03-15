/*
* @Author: Venus-Lin
* @Date:   2018-10-12 23:11:09
* @Last Modified by:   Venus-Lin
* @Last Modified time: 2018-10-19 10:56:13
*/
const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    let {id,ps} = ctx.request.body
	     try {
	        await mysql('userInfo').insert({
	            account:id,
	            password:ps
	        })
	        let tableName = 'u'+id
			await mysql.schema.createTable(tableName, function (table) {
			  table.increments();
			  table.string('name');
			})
	        ctx.state = {
	        	code:0,
	        	data:{
	        		msg: '注册成功，欢迎加入JimmyChat！'
	        	}
	        }
	    } catch (e) {
	        ctx.state = {
	            code: -1,
	            data: {
	                msg: '数据库原因:' + e.sqlMessage
	            }
	        }
	    }
    }

