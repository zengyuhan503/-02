<template>
	<uni-nav-bar left-icon="left" right-icon="cart" title="标题" />
	<web-view :src='cs_link'>
	</web-view>
</template>

<script>
	import {home} from "@/api/list.js"
	export default {
		data() {
			return {
				cs_link:""
			}
		},
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
		},
		onUnload() {
				console.log('App onUnload')
		},
		onShow: function() {
			this.handleGetConfigs()
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			handleGetConfigs(){
				home().then((res)=>{
					this.cs_link=res.data.cs_link;
				})
			}
		}
	}
</script>

<style>
</style>
