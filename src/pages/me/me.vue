<template>
	<div>
		<div class="wrapper">
			<div class="imgWrapper">
				<img src="../../img/main.png" mode="aspectFill" class="imgMain">
			</div>
			<div class="login" v-show="showBtn"><a href="../login/main">登入JimmyChat</a></div>
			<div class="register" v-show="showBtn"><a href="../register/main">新建一个账号</a></div>
			<div class="loginSucc" v-show="!showBtn">欢迎您,{{id}}</div>
			<div class="loginbtn" v-show="!showBtn" @click="handleExit">退出登陆</div>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{
			id:'',
			showBtn:1
		}
	},
	methods:{
		handleExit(){
			this.showBtn = 1
			wx.setStorage({
			  key:"loginer",
			  data: ''
			})
		},
		isLogin(){
			const that = this
			wx.getStorage({
				key:'loginer',
				success:function(res){
					if(res.data){
						that.showBtn = 0
					}
					that.id = res.data
				}
			})
		}

	},
	onShow(){
		this.isLogin()
	}
	
}
</script>

<style lang="stylus" scoped>
	.wrapper
		text-align center
		position absolute
		width 100%
		top 200rpx
		.imgWrapper
			.imgMain
				width 250rpx
				height 250rpx
				border-radius 50%
		.login
			left 75rpx
			top 50rpx
			position relative
			height 80rpx
			width 600rpx
			line-height 80rpx
			background-color #a0e75a
		.register
			top 80rpx
			line-height 80rpx
			position relative
			left 75rpx
			width 600rpx
			height 80rpx
			background-color #a0e75a
		.loginSucc
			position relative
			top 80rpx
			font-size 45rpx
		.loginbtn
			top 180rpx
			line-height 80rpx
			position relative
			left 75rpx
			width 600rpx
			height 80rpx
			background-color #a0e75a
			
</style>