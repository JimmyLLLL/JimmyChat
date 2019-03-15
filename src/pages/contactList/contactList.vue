<template>
	<div>
		<div class="top">
			<div class="topWord" v-show="showWord">联系人</div>
			<div class="topSearch" v-show="!showWord">
				<input 
				type="text" 
				name="" 
				placeholder="茫茫人海搜寻一人" 
				class="search" 
				v-model="targetUser" 
				@confirm="handleEnter">
			</div>
			<div class="topAdd" @click="handleAddClick">{{addWord}}</div>
		</div>
		<div v-show="!isShowList" class="searchWrapper">
			<div class="searchImgWrapper"><img src="" class="searchImg"></div>
			<div class="searchWord">{{tempUser}}</div>
			<div class="addBtn" @click="handleAddUser" v-show="showaddBtn">添加联系人</div>
		</div>
		<div class="mainWrapper" v-show="isShowList">
			<a href="../indexIn/main" v-for="item in contactorInfo" @click="handleClick(item)" :key="item.name">
				<div class="contactorWrapper">
					<div class="main">
						<div class="left"><img :src="item.imgUrl"></div>
						<div class="right">{{item.name}}</div>
						<div class="delete" @click.stop="handleDelete(item.name)">-</div>
					</div>
				</div>
			</a>			
		</div>

	</div>
</template>

<script>
import {get,post} from '../../util.js'
export default {
	data(){
		return{
			showaddBtn:0,
			tempUser:'此用户不存在',
			isShowList:1,
			targetUser:'',
			addWord:'+',
			showWord:1,
			contactorInfo:[]
		}
	},
	methods:{
		handleDelete(item){
			const that = this
			wx.showModal({
				title:'JimmyChat',
				content:'删？无悔。',
				cancelText:'算了',
				confirmText:'好',
				success:function(y){
					if(y.confirm)
					{
						wx.getStorage({
							key:'loginer',
							success:async function(res){
								const ajaxres = await post('/weapp/deleteC',{
									id:res.data,
									deleteID:item
								})
								that.getList()
							}
						})						
					}

				}
			})

		},
		//每次点击联系人进行更新数据
		getList(){
			const that = this
			wx.getStorage({
				key:'loginer',
				success:async function(res){
					if(res.data){
						const myfriend = await post('/weapp/myfriend',{
							me:res.data
						})
						that.contactorInfo = []
						myfriend.data.allFriend.forEach((item,index)=>{
							that.contactorInfo.push(
									{
										name:item.name,
										imgUrl:''
									}
								)
						})						
					}else{
						that.contactorInfo = []
					}
				}
			})
		},
		handleAddUser(){
			let nowUser
			const that = this
			wx.getStorage({
				key:'loginer',
				success:async function(res){
					if(res.data){
						let ajaxres = await post('/weapp/addFriend',{
							me:res.data,
							friend:that.tempUser
						})
						if(ajaxres.data.msg == 0){
							wx.showToast({
								title:'曾经添加过Ta',
								duration:1000,
								success:function(){
									that.showWord = !that.showWord
									that.isShowList = !that.isShowList
									that.addWord = '+'
								}
							})
						}else if(ajaxres.data.msg == -1){
							wx.showToast({
								title:'数据库崩了',
								duration:1000,
								success:function(){
									that.showWord = !that.showWord
									that.isShowList = !that.isShowList
									that.addWord = '+'
								}
							})
						}else if(ajaxres.data.msg == 1){
							const myfriend = await post('/weapp/myfriend',{
								me:res.data
							})
							wx.showToast({
								title:'添加成功',
								duration:1000,
								success:function(){
									that.showWord = !that.showWord
									that.isShowList = !that.isShowList
									that.addWord = '+'
								}
							})
							that.contactorInfo = []
							myfriend.data.allFriend.forEach((item,index)=>{
								that.contactorInfo.push(
										{
											name:item.name,
											imgUrl:''
										}
									)

							})
						}
					}else{
						console.log('请先登录')
					}
				}
			})
		},
		async handleEnter(){
			this.isShowList = 0
			const that = this
			const res = await post('/weapp/repetValidy',{
				id:that.targetUser
			})
			if(res.data.msg == 1){
				this.tempUser = res.data.name
				this.showaddBtn = 1
			}else{
				this.showaddBtn = 0
				console.log(res.data.explain)
			}
		},
		handleAddClick(){
			this.targetUser = ''
			this.showWord = !this.showWord
			if(!this.showWord){
				this.addWord = '-'
			}else{
				this.isShowList = 1
				this.addWord = '+'
			}
		},
	    handleClick (item) {
	      let id = item.name
	      wx.setStorage({
	        key:"nowContactor",
	        data: id
	      })
	    }

	},
	onShow(){
		this.getList()
	}
}
</script>

<style lang="stylus" scoped>
	.top
		z-index 2
		height 80rpx
		line-height 80rpx
		position fixed
		width 100%
		background-color #252525
		color white
		text-align center
		font-size 35rpx
		.topSearch
			.search
				height 80rpx
				line-height 80rpx
				width 670rpx
				color white
		.topAdd
			position relative
			z-index 1
			color white
			top -85rpx
			left 335rpx
			font-size 60rpx
	.searchWrapper
		position relative
		top 80rpx
		width 100%
		text-align center
		.searchImgWrapper
			width 200rpx
			height 200rpx
			position relative
			left 275rpx
			top 250rpx
			background-color grey
			overflow hidden
			border-radius 50%
		.searchWord
			position relative
			font-size 40rpx
			top 280rpx
		.addBtn
			height 80rpx
			width 680rpx
			background-color #a0e75a
			position relative
			line-height 80rpx
			top 370rpx
			left 35rpx
	.mainWrapper
		position absolute
		top 80rpx
		width 100%
		overflow hidden
		.contactorWrapper
			padding 10rpx
			width 100%
			height 100rpx
			border-bottom 1rpx solid #f2f2f2
			.main
				display inline-block
				width 100%
				height 100%
				.left
					height 100rpx
					width 100rpx
					float left 
					background-color grey
				.right
					position relative
					left 20rpx
					top 25rpx
				.delete
					position relative
					width 80rpx
					height 60rpx
					border 1px solid #f2f2f2
					color #a0e75a
					font-size 50rpx
					text-align center
					line-height 60rpx
					bottom 35rpx
					right 35rpx
					float right
					
		
</style>