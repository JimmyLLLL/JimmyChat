<template>
	<div>
		<div class="wrapper">
			<div class="word">欢迎您加入JimmyChat</div>
			<div class="inputDiv">
				<input 
				class="id" 
				type="text" 
				name="" 
				placeholder="输入新用户名" 
				v-model="id" 
				@blur="handleBlur"
				@focus="handleFocus"
				>
				<input class="password" type="password" name="" placeholder="输入密码" v-model="ps" @confirm="handleRegister">
			</div>
			<div class="warnWrod" v-show="isShow">此ID已被注册</div>
			<div class="btn" @click="handleRegister">注册</div>
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
			isShow:0
		}
	},
	methods:{
		handleFocus(){
			this.isShow = 0
		},
		async handleBlur(){
			const that = this
			const res = await post('/weapp/repetValidy',{
				id:that.id
			})
			if(res.data.msg == 1){
				that.isShow = 1
			}else{
				that.isShow = 0
			}
		},
		async handleRegister(){
			const that = this
			if(!this.isShow){
				const res = await post('/weapp/register',{
					id:that.id,
					ps:that.ps
				})
				if(res.code == 0){
					wx.showToast({
						title:'注册成功',
						success:function(){
							that.id=''
							that.ps=''
							setTimeout(function(){
								wx.navigateBack({
	    						delta: 1
								})
							},1000)
						}
					})
				}
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