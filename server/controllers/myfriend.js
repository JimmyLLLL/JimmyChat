/*
* @Author: Venus-Lin
* @Date:   2018-10-19 10:31:12
* @Last Modified by:   Venus-Lin
* @Last Modified time: 2018-10-19 16:33:15
*/
//用来输出自己已经添加的好友

const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    let {me} = ctx.request.body
    me = 'u' + me
    let allFriend = await mysql(me).select('name')
    ctx.state.data = {
    		allFriend
    }
}
