/*
* @Author: Venus-Lin
* @Date:   2018-10-17 20:38:34
* @Last Modified by:   Venus-Lin
* @Last Modified time: 2018-10-17 20:52:23
*/
const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    let {id,ps} = ctx.request.body
	     try {
     		const validyId = await mysql('userInfo').select().where('account', id)
     		if(validyId.length){
     			if(validyId[0].password == ps){
     				ctx.state.data={
     					msg:1,
     					id
     				}
     			}else{
     				ctx.state.data={
     					msg:0
     				}
     			}
     		}else{
     			ctx.state.data={
     				msg:-1 //此时数据库不存在数据
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
