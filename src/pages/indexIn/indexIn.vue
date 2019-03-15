<template>
	<div class="grey" id="chat">
		<div class="top">
			<div class="topWord">{{id}}</div>
		</div>
		<div class="chat" v-for="(item,index) in chatContent" :key="index">
			<div class="wordWrapper">
		 		<p :class="item.style">{{item.word}}</p>				
			</div>

		</div>
		<div class="placeholder">
		</div>
		<div class="bottom">
			<input type="text" name="" class="bottomInput" @confirm="handleEnter" v-model="inputContent">
		</div>
	</div>
</template>

<script>
export default {
	data () {
	return {
		nowLoginer:'',
		id:'',
		inputContent:'',
		chatContent:[]
	}
	},
	methods:{
		handleEnter(){
			this.chatContent.push({
				word:this.inputContent,
				style:'me'
			})
			this.inputContent = ''
			//this.saveChatData()
			setTimeout(this.scrollToBot,0)

		},
		//保存聊天记录
		saveChatData(){
			const that = this
		      wx.setStorage({
		        key:that.nowLoginer+that.id,
		        data: that.chatContent
		      })
		},
		getShowIndex(){
			const that = this
			wx.getStorage({
				key:'nowContactor',
				success:function(res){
					that.id = res.data
				}
			})
		},
		scrollToBot(){
		    wx.createSelectorQuery().select('#chat').boundingClientRect(function(rect){
		      wx.pageScrollTo({
		        scrollTop: rect.bottom,
     			duration:0
		      })
		    }).exec()

		},
		getID(){
			const that = this
			wx.getStorage({
				key:'loginer',
				success:function(res){
					that.nowLoginer = res.data
				}
			})
		}
	},
	mounted(){
		this.getShowIndex()
		this.scrollToBot()
	},
	onShow(){
		//this.getID()
	}

}

	

</script>

<style lang="stylus" scoped>
	.top
		z-index 2
		height 80rpx
		line-height 80rpx
		background-color #252525
		color white
		text-align center
		position fixed
		width 100%
		.topWord
			font-size 40rpx
			position relative
	.chat
		position relative
		top 100rpx
		.wordWrapper
			overflow hidden
			margin-bottom 20rpx	
			font-size 30rpx	
			.me
				padding 10rpx
				background-color #a0e75a
				position relative
				float right
				max-width 400rpx
				right 20rpx
				border-radius 15rpx
			.me::after
				content ""
				display block
				position absolute
				width 0
				height 0
				border 16rpx solid transparent
				border-left-color #a0e75a
				top 18rpx
				right -30rpx
			.you::after
				content ""
				display block
				position absolute
				width 0
				height 0
				border 16rpx solid transparent
				border-right-color blue
				top 18rpx
				left -30rpx
			.you
				border-radius 15rpx
				color white
				padding 10rpx
				position relative
				left 20rpx
				background-color blue
				float left
				max-width 400rpx
	.placeholder
		width 100%
		height 230rpx
		margin-top 0
	.bottom
		position fixed
		width 100%
		background-color #f5f5f6
		height 90rpx
		bottom 0
		padding 20rpx
		.bottomInput
			width 690rpx
			background-color #fcfcfc
			height 70rpx
			padding 10rpx
			
			
			
			
	
</style>