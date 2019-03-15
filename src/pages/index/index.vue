<template>
  <div>
    <div class="titleWrapper"><div class="title">JimmyChat欢迎你！</div></div>
   <a href="../indexIn/main" v-for="item in contactorInfo" :key="item.name" @click="handleListClick(item)" class="aWrapper">
    <div class="peopleListWrapper">
        <div class="peopleList">
          <div class="listWrapper">
            <div class="listLeft"><img :src="item.imgSrc"></div>
            <div class="listRight">
              <div class="listName">{{item.name}}</div>
              <div class="listChat">{{item.latestChat}}</div>
            </div>
          </div>
        </div>
    </div>
  </a>
  </div>
</template>

<script>

export default {
  data () {
    return {
      contactorInfo:[{
        imgSrc:'',
        name:'Lam Zing-Man',
        latestChat:'今天天气还好吗'
      },{
        imgSrc:'',
        name:'Jack',
        latestChat:'很高兴认识你'
      },{
        imgSrc:'',
        name:'Rose',
        latestChat:'可以呀'
      },{
        imgSrc:'',
        name:'Messi',
        latestChat:'好'
      },{
        imgSrc:'',
        name:'Marry',
        latestChat:'没问题，6点见'
      }]
    }
  },

  components: {

  },

  methods: {
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    handleListClick (item) {
      let id = item.name
      wx.setStorage({
        key:"nowContactor",
        data: id
      })
    }

  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style lang="stylus" scoped>
  .titleWrapper
    height 80rpx
    line-height 80rpx
    background-color #252525
    text-align center
    position fixed
    width 100%
    z-index 2
    .title
      font-size 30rpx
      color white
  .aWrapper
    position relative
    top 80rpx
    .peopleList
      height 130rpx
      border-bottom 1rpx solid #f2f2f2
      padding 10rpx
      .listWrapper
        width 100%
        height 100%
        display inline-block
        overflow hidden
        .listLeft
          background-color #f2f2f2
          width 130rpx
          height 130rpx
          float left 
        .listRight
          .listName
            font-size 45rpx
            left 20rpx
            position relative
          .listChat
            font-size 30rpx
            position relative
            left 20rpx
            top 20rpx
          
        
        

</style>
