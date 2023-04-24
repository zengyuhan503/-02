<template>
	<view class="">
		<view class="page_text" v-html="page_contract">

		</view>
		<view class=""
			style="">

			<button class="button" type="primary" @click="toService">立即联系客服</button>
			<button class="button" type="primary" style="background-color: #a1a197;margin-top: 20px;"
				@click="toHome">返回首页</button>
		</view>
	</view>
</template>

<script setup>
	import {
		reactive,
		ref,
		onActivated,
		onMounted
	} from 'vue'
	import {
		getCsMessage
	} from '@/api/list.js'

	import {
		onLoad
	} from '@dcloudio/uni-app'
	let page_contract = ref('')
	let orderId = 65
	const handleGetPageContract = (order_id) => {
		let params = {
			order_id: order_id
		}
		getCsMessage(params).then((res) => {
			let data = res.data;
			console.log(res)
			let vhtmls = data.replace(/\<p/g, "<view")
			vhtmls = data.replace(/\p>/g, "view></br>")
			page_contract.value = vhtmls
		})
	}
	onLoad((query) => {
		orderId =query.order_id
		handleGetPageContract(orderId)
	})
	let toService = () => {
		uni.redirectTo({
			url: '/pages/service/index'
		})
	}
	let toHome = () => {
		uni.redirectTo({
			url: '/pages/home/index'
		})
	}
</script>

<style lang="less">
	.page_text {
		padding: 10px 30px;
		text-align: center;
		view {
			line-height: 40px;
			font-size: 17px;
			text {
				color: crimson;
			}
		}
	}
</style>