<script setup lang="ts">
	import { ref, reactive } from "vue";
	import { onLoad, onShow } from "@dcloudio/uni-app"
	import footerBar from '../components/footer-bar.vue'
	import { userInfo } from '@/api/list.js'
	import {
		useCounterStore
	} from '@/stores/config.js'
	const handleSubmitLogin = () => {
		uni.removeStorage({
			key: 'Token',
			success: function (res) {
				uni.navigateTo({
					url: '/pages/index/index'
				});
			}
		});

	}
	let useStore = useCounterStore()
	let phone = ref(null)
	const getUserInfo = () => {
		userInfo().then((res) => {
			let data = res.data;
			phone.value = data.phone;
			useStore.SetUser(data)
		})
	}
	onShow(() => {
		getUserInfo()
	})
</script>
<template>
	<view class="page-container">
		<view class="page-user">
			<image src="../../static/photo.png" mode=""></image>
			<view class="page-user-name">
				{{phone}}
			</view>
		</view>
		<view class="page-data">
			<uni-list>
				<uni-list-item :showArrow="true" title="我的资料" link="navigateTo" to="/pages/user/basicsInfo"></uni-list-item>
				<uni-list-item :showArrow="true" title="我的借款" link="navigateTo" to="/pages/loan/bill"></uni-list-item>
				<uni-list-item :showArrow="true" title="我的还款" link="navigateTo" to="/pages/loan/repayment"></uni-list-item>
				<uni-list-item :showArrow="true" title="新手指南"></uni-list-item>
			</uni-list>
		</view>
		<view class="page-loginOut">
			<button class="button" type="primary" @click="handleSubmitLogin">退出登录</button>
		</view>

		<view class="" style="height: 100px;">

		</view>
		<footerBar />

	</view>

</template>


<style lang="scss">
	@import './index.scss'
</style>