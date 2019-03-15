/*
* @Author: Venus-Lin
* @Date:   2018-10-17 19:32:23
* @Last Modified by:   Venus-Lin
* @Last Modified time: 2018-10-19 10:20:03
*/

//beta1:验证数据库是否重复
//beta2:增加返回重复的名字功能，进行搜索用户调用

const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    let {id} = ctx.request.body
     const isRepet = await mysql('userInfo').select().where('account', id)
     if(isRepet.length){
     	ctx.state.data = {
     		msg:1,
               name:id
     	}
     }else{
     	ctx.state.data = {
     		msg:0,
               explain:'此用户不存在'
     	}
     }

}
