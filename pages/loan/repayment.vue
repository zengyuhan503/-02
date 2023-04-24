<script setup lang="ts">
	import { ref, reactive } from "vue";
	import { onLoad, onShow } from "@dcloudio/uni-app"
	import { orderList } from '@/api/list.js'
	let orders=ref([])
	const handleGetOrderList = () => {
		orderList().then((res) => {
			orders.value=res.data;
		})
	}
	onShow(() => {
		handleGetOrderList()
	})
</script>
<template>
	<view class="page-container">
		<view class="repayment-items">
			
		</view>
		<view class="no-repayment ">
			<image src="../../static/p_01.png" mode="aspectFill"></image>
			<view class="no-repayment-text">
        无需还款哦！
				<br>
        您本月暂无需要还款账单。
			</view>
		</view>
	</view>
</template>


<style lang="scss">
	@import './index.scss'
</style>