<script setup lang="ts">
	import { ref, reactive } from "vue";
	import { onLoad, onShow } from "@dcloudio/uni-app"
	import { apply } from '@/api/list.js'
	import {
		useCounterStore
	} from '@/stores/config.js'
	let formData = reactive({
		money: 0,
		donemonth: 0,
		monthmoney: 0,
		monthlyInterestPrice: 0,
		lixi: 0
	})
	let userStore = ref({
		bankname: "",
		username: "",
		bankid: "",
	})
	let message = ref('')
	const handleSubmit = () => {

	}
	onLoad(obj => {
		Object.assign(formData, obj)
	});
	onShow(() => {
		console.log(useCounterStore().GetUser)
		userStore.value = useCounterStore().GetUser
	});
	const handleSubmitToBill = () => {
		let params = {
			money: formData.money,
			donemonth: formData.donemonth,
			monthmoney: formData.monthmoney,
			lixi: formData.lixi,
			message: message.value
		}
		apply(params).then(res => {
			if (res.code != 200) {
				return false
			}
			uni.navigateTo({
				url: '/pages/loan/bill'
			});
		})

	}
</script>
<template>
	<view class="page-container">
		<uni-section class="mb-10" title="确认借款信息" type="line"></uni-section>
		<view class="page-bill-info page-bill-info-items" style="border-top: 1px solid #eee;">
			<view class="page-bill-info-item">
				<uni-row>
					<uni-col :span="5">
						<view class="info-title">借款金额</view>
					</uni-col>
					<uni-col :offset="1" :span="15">
						<view class="info-desc">￥{{formData.money}}元</view>
					</uni-col>
				</uni-row>
			</view>
			<view class="page-bill-info-item">
				<uni-row>
					<uni-col :span="5">
						<view class="info-title">借款期限</view>
					</uni-col>
					<uni-col :offset="1" :span="15">
						<view class="info-desc">{{formData.donemonth}}月 </view>
					</uni-col>
				</uni-row>
			</view>
			<view class="page-bill-info-item">
				<uni-row>
					<uni-col :span="5">
						<view class="info-title">每月还款</view>
					</uni-col>
					<uni-col :offset="1" :span="15">
						<view class="info-desc">
							￥{{(formData.monthmoney)}}元
							<br>
							<text style="color: #999;">（含月利息 ￥{{formData.monthlyInterestPrice}}元）</text>
						</view>
					</uni-col>
				</uni-row>
			</view>
			<view class="page-bill-info-item">
				<uni-row>
					<uni-col :span="5">
						<view class="info-title">到账银行</view>
					</uni-col>
					<uni-col :offset="1" :span="15">
						<view class="info-desc">{{userStore.bankname}}</view>
					</uni-col>
				</uni-row>
			</view>
			<view class="page-bill-info-item">
				<uni-row>
					<uni-col :span="5">
						<view class="info-title">收款户名</view>
					</uni-col>
					<uni-col :offset="1" :span="15">
						<view class="info-desc">{{userStore.username}}</view>
					</uni-col>
				</uni-row>
			</view>
			<view class="page-bill-info-item">
				<uni-row>
					<uni-col :span="5">
						<view class="info-title">收款账号</view>
					</uni-col>
					<uni-col :offset="1" :span="18">
						<view class="info-desc">{{userStore.bankid}}</view>
					</uni-col>
				</uni-row>
			</view>
			<view class="page-bill-info-item" style="height: 120px;">
				<uni-row>
					<uni-col :span="5">
						<view class="info-title">借款用途</view>
					</uni-col>
					<uni-col :offset="1" :span="18">
						<view class="info-desc">
							<uni-easyinput type="textarea" autoHeight v-model="message" placeholder="请输入内容"></uni-easyinput>
						</view>
					</uni-col>
				</uni-row>
			</view>
		</view>
		<view class="page-submit" style="margin-top: 20px;">
			<button class="button" type="primary" @click="handleSubmitToBill">立即申请</button>
		</view>

	</view>
</template>


<style lang="scss">
	@import 'index.scss'
</style>