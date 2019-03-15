<template>
	<div>
		<div class="wrapper">
			<div class="word">欢迎您登入JimmyChat</div>
			<div class="inputDiv">
				<input 
				class="id" 
				type="text" 
				name="" 
				placeholder="输入您的ID" 
				v-model="id"
				@focus="handleFocus" 
				>
				<input 
				class="password" 
				type="password" 
				name="" 
				placeholder="输入密码" 
				v-model="ps" 
				@confirm="handleLogin"
				@focus="handleFocus"
				>
			</div>
			<div class="warnWrod">{{showData}}</div>
			<div class="btn" @click="handleLogin">登入</div>
		</div>
	</div>
</template>

<script>
import {get,post} from '../../util.js'
export default{
	data () {
		return {
			id:'',
			ps:'',
			showData:''
		}
	},
	methods:{
		handleFocus(){
			this.showData=''
		},
		async handleLogin(){
			const that = this
			const res = await post('/weapp/appLogin',{
				id:that.id,
				ps:that.ps
			})
			if(res.data.msg==1){
				wx.showToast({
					title:'登陆成功',
					success:function(){
						wx.setStorage({
						  key:"loginer",
						  data: res.data.id
						})
						that.id=''
						that.ps=''
						setTimeout(function(){
							wx.navigateBack({
    						delta: 1
							})
						},1000)
					}
				})
			}else if(res.data.msg==0){
				this.showData='密码验证错误'
			}else if(res.data.msg==-1){
				this.showData='此用户未注册'
			}
		}
	
	}

}
</script>

<style lang="stylus" scoped>
	.wrapper
		text-align center
		padding 20rpx
		.word
			font-size 60rpx
			position relative
			top 100rpx
		.inputDiv
			position relative
			top 200rpx
			.id
				height 30rpx
			.password
				height 30rpx
				margin-top 20rpx
		.btn
			position relative
			top 360rpx
			left 265rpx
			width 200rpx
			height 200rpx
			border-radius 50%
			background-color #a0e75a
			color white
			line-height 200rpx
			font-size 40rpx
		.warnWrod
			position absolute
			top 470rpx
			left 267rpx
			color red	
</style>