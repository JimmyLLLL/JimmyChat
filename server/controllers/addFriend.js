const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    let {me,friend} = ctx.request.body
    me = 'u' + me
     const isRepet = await mysql(me).select().where('name', friend)
     if(isRepet.length){
        ctx.state.data = {
            msg:0,
            explain:'Ta已经是您的好友'
        }

     }else{
      try{
          await mysql(me).insert({
                name:friend
            })  
          ctx.state.data = {
              msg:1,
              explain:'添加成功'
          }
      }catch(e){
          ctx.state.data = {
              msg:-1,
              explain:'服务器出错'
          }        
      }
    }

}