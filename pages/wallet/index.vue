<script setup lang="ts">
	import { ref, reactive, useSlots } from "vue";
	import footerBar from '../components/footer-bar.vue'
	import {
		useCounterStore
	} from '@/stores/config.js'
	import {
		getPurse
	} from '@/api/list.js'
	import {
		onLoad
	} from '@dcloudio/uni-app';
	let money=ref(0)
	let userStore=ref({
		bankname:"",
		bankid:""
	})
	const handleGetPurse = () => {
		getPurse().then((res) => {
			console.log(res)
			money.value=res.data.money
		})
	}
	const handleToBill=()=>{
		uni.navigateTo({
			url:'/pages/loan/bill'
		})
	}
	onLoad(() => {
		userStore.value=useCounterStore().GetUser;
		userStore.value.bankid=userStore.value.bankid.replace(/.(?=.{4})/g, "*")
		console.log(userStore.value)
		handleGetPurse()
	})
</script>
<template>
	<view class="page-container">
		<view class="page-wallet">
			<view class="page-wallet-moneyAll">
				<view class="wallet-jiekuan">
					<view class="" style="font-size: 28px;">
						{{money}}
					</view>
					<view class="" style="font-size: 13px;">
						借款金额（元）
					</view>
				</view>
				<view class="yue">
					<view class="" style="font-size: 28px;">
						0
					</view>
					<view class="" style="font-size: 13px;">
						账户余额
					</view>
				</view>
			</view>

			<view class="page-wallet-tixian">
				<view class="page-wallet-ed">
					下款到账金额：{{money}}(元)
				</view>

				<view class="page-wallet-btn" @click="handleToBill">
					立即提现
				</view>
			</view>
		</view>
		<view class="page-bank">
			<view class="page-bank-name">
				资金保障
			</view>
			<view class="page-bank-card">
				<view class="">
					{{userStore.bankname}}
				</view>
				<view class="">
				{{userStore.bankid}}
				</view>
			</view>
		</view>

		<view class="page-support">
			<view class="page-support-title">
				账户资金安全由银行保障
			</view>
			<view class="page-support-card">
				<image src="../../static/31.png" mode="aspectFit"></image>
			</view>
		</view>

		<view class="" style="height: 200px;">

		</view>

		<footerBar />
	</view>
</template>


<style lang="scss">
	@import './index.scss'
</style>