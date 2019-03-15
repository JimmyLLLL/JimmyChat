/*
* @Author: Venus-Lin
* @Date:   2018-10-19 21:50:08
* @Last Modified by:   Venus-Lin
* @Last Modified time: 2018-10-19 22:16:59
*/
const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    let {id,deleteID} = ctx.request.body
    id = 'u' + id
	await mysql(id).where('name',deleteID).del()
    ctx.state.data = {
    		msg:'成功删除'
    }
}