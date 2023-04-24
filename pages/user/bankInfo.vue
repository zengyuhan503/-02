<script setup lang="ts">
	import { ref, reactive } from "vue";
	import { onLoad, onShow } from "@dcloudio/uni-app"
	import { userInfo, updateInfo } from '@/api/list.js'
	let formData = reactive({
		bankname: "",
		bankid: "",
	})
	function isBank(bank) {
		if (
			bank === undefined ||
			typeof bank === 'undefined' ||
			!bank ||
			bank == null ||
			bank === '' ||
			/^\s+$/gi.test(bank)
		) {
			return false
		} else {
			const myreg = /^[1-9]\d{9,29}$/
			if (!myreg.test(bank)) {
				return false
			} else {
				return true
			}
		}
	}
	let range = ref([
		{ value: "浦发银行", text: "浦发银行" },
		{ value: "建设银行", text: "建设银行" },
		{ value: "邮储银行", text: "邮储银行" },
		{ value: "农业银行", text: "农业银行" },
		{ value: "中国银行", text: "中国银行" },
		{ value: "工商银行", text: "工商银行" },
		{ value: "招商银行", text: "招商银行" },
	])

	const handleSubmit = () => {
		let params = { ...formData }
		if (Object.values(params).some(value => value === "" || value === null)) {
			uni.showToast({
				title: '请填写相关信息',
				icon: 'error'
			})
			return false
		}
		if (!isBank(formData.bankid)) {
			uni.showToast({
				title: '银行卡错误',
				icon: 'error'
			})
			return false
		}
		updateInfo(params).then(res => {
			if (res.code != 200) {
				uni.showToast({
					title: res.msg,
				})
				return false
			}
			uni.navigateTo({
				url: '/pages/user/index'
			})
		})
	}
	const getUserInfo = () => {
		userInfo().then((res) => {
			let data = res.data;
			for (let key in formData) {
				formData[key] = data[key]
			}
		})
	}
	onShow(() => {
		getUserInfo()
	})
</script>
<template>
	<view class="page-container">
		<uni-list>
			<uni-list-item title="持卡人姓名" rightText="铁牛" />
		</uni-list>
		<uni-list>
			<uni-list-item title="持卡人身份证号码" rightText="123456789" />
		</uni-list>
		<view class="page-bank">
			<uni-section class="mb-10" title="直属亲属联系方式" type="line"></uni-section>
			<view class="page-bank-form">
				<uni-forms :modelValue="formData" label-width='80px'>
					<uni-forms-item label="开户银行" name="idCard" required>
						<uni-data-select v-model="formData.bankname" :localdata="range"></uni-data-select>
					</uni-forms-item>
					<uni-forms-item label="银行卡号" name="name" required>
						<uni-easyinput type="text" v-model="formData.bankid" placeholder="请输入银行卡号" />
					</uni-forms-item>
				</uni-forms>
				<view class="page-loginOut">
					<button class="button" type="primary" @click="handleSubmit">下一步</button>
				</view>
			</view>
		</view>

	</view>
</template>


<style lang="scss">
	@import './index.scss';
</style>