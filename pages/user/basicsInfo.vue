<script setup lang="ts">
	import { ref, reactive } from "vue";
	import { onLoad, onShow } from "@dcloudio/uni-app"
	import { userInfo } from '@/api/list.js'
	let phone = ref(null)
	let isidCard = ref(false)
	let isInfo = ref(false)
	let isBank = ref(false)
	const getUserInfo = () => {
		userInfo().then((res) => {
			let data = res.data;
			phone.value = data.phone;
			if (data.idcard !== null) {
				isidCard.value = true
			}
			if (data.linkname !== null) {
				isInfo.value = true
			}
			if (data.bankid !== null) {
				isBank.value = true
			}
		})
	}
	const handleToApply=()=>{
		uni.navigateTo({
			url:'/pages/loan/apply'
		})
	}
	onShow(() => {
		getUserInfo()
	})
</script>
<template>
	<view class="page-container">
		<view class="page-user-info">
			<view class="page-user-info-waring">
				只需3分钟完成资料验证，即可申请借款哦~
			</view>
			<uni-list :border="true">
				<!-- 显示圆形头像 -->
				<uni-list-chat title="身份信息" link='navigateTo' to="/pages/user/idcard" avatar="../../static/g_03.png"
					note="*让我们了解您的基本情况">
					<view class="chat-custom-right">
						<text v-if="isidCard">已填写</text> <uni-icons type="right" color="#999" size="18"></uni-icons>
					</view>
				</uni-list-chat>
				<uni-list-chat title="资料信息" link='navigateTo' to="/pages/user/data" avatar="../../static/g_08.png"
					note="*让我们了解您的资料信息">
					<view class="chat-custom-right">
						<text v-if="isInfo">已填写</text> <uni-icons type="right" color="#999" size="18"></uni-icons>
					</view>
				</uni-list-chat>
				<uni-list-chat title="收款银行卡" link='navigateTo' to="/pages/user/bankInfo" avatar="../../static/g_14.png"
					note="*分期平台将钱打到该卡内">
					<view class="chat-custom-right">
						<text v-if="isBank">已填写</text> <uni-icons type="right" color="#999" size="18"></uni-icons>
					</view>
				</uni-list-chat>
			</uni-list>

			<view class="page-loginOut">
				<button class="button" type="primary" @click="handleToApply">立即借款</button>
			</view>
		</view>
	</view>
</template>


<style lang="scss">
	@import './index.scss'
</style>