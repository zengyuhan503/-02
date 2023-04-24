<script setup lang="ts">
	import { ref, reactive } from "vue";
	import { isPhone } from '../../utils/reg.js'
	import { login } from '@/api/list.js'
	let formData = reactive({
		phone: "",
		password: ""
	})
	let checkAgreement = ref([{
		text: '',
		value: 0
	}])
	let isAgreement = ref(false)
	let showLeftSginArg = ref(null)
	const ShowSginAgreement = () => {
		showLeftSginArg.value.open()
	}
	let showLeftPrivacyArg = ref(null)
	const ShowPrivacyAgreement = () => {
		console.log(showLeftPrivacyArg)
		showLeftPrivacyArg.value.open()
	}

	const handleSubmitToHome = () => {
		let phone = formData.phone;
		if (!isAgreement.value) {
			uni.showToast({
				title: '请先同意协议',
				icon: 'error'
			})
			return false
		}
		if (!isPhone(phone)) {
			uni.showToast({
				title: '手机号填写错误',
				icon: 'error'
			})
			return false
		}
		let params = {
			...formData
		}
		login(params).then((res) => {
			console.log(res)
			if (res.code != 200) {
				uni.showToast({
					title: res.msg,
					icon: 'error'
				})
				return false
			}
			let Token = res.data.Token.token;
			let refresh_token = res.data.Token.refresh_token;
			let UserId = res.data.user_id;
			try {
				uni.setStorageSync('Token', Token);
				uni.setStorageSync('refresh_token', refresh_token);
				uni.setStorageSync('UserId', UserId);
				uni.navigateTo({
					url: '/pages/home/index'
				});
			} catch (e) {
				// error
				uni.showToast({
					title: 'APP错误，请重新打开',
					icon: 'error'
				})
			}

		}).catch((err) => {

		})
	}
	const handleSubmitToSign = () => {
		uni.navigateTo({
			url: '/pages/signup/index'
		});
	}
</script>
<template>
	<view class="page-container">
		<view class="login-header">
			<view class="login-heade-txt">
				随借随还
			</view>
			<view class="login-heade-txt">
				无需<text>等待</text>
			</view>
		</view>
		<view class="login-body">
			<view class="login-form">
				<view class="login-title">
					欢迎登录
				</view>
				<view class="login-input">
					<uni-forms class="forms-item" modelValue="formData">
						<uni-easyinput :inputBorder="false" prefixIcon="phone" v-model="formData.phone" placeholder="输入你的手机号">
						</uni-easyinput>
						<uni-easyinput :inputBorder="false" type="password" prefixIcon="locked" v-model="formData.password"
							placeholder="请输入你设置的密码"></uni-easyinput>
					</uni-forms>
					<button class="button" @click="handleSubmitToHome" type="primary">登录</button>
					<button class="button" @click="handleSubmitToSign" type="primary">注册</button>
					<view class="login-xieyi">
						<uni-data-checkbox multiple v-model="isAgreement" :localdata="checkAgreement"></uni-data-checkbox>
						同意 <text @click="ShowSginAgreement">《注册协议》</text>，<text @click="ShowPrivacyAgreement">《隐私政策协议》</text>
					</view>
				</view>
			</view>
		</view>
		<view class="forget-pwd">
			忘记密码请点击 <text>联系客服</text>
		</view>
		<uni-drawer ref="showLeftSginArg" mode="left" :width="300">
			<view class="agreement">
				<view class="agre_header">
					《用户注册协议》1
				</view>
				<view class="agre_body">
					《用户注册协议》《用户注册协议》《用户注册协议》《用户注册协议》《用户注册协议》《用户注册协议》《用户注册协议》《用户注册协议》《用户注册协议》《用户注册协议》《用户注册协议》
				</view>
			</view>
		</uni-drawer>

		<uni-drawer ref="showLeftPrivacyArg" mode="left" :width="300">
			<view class="agreement">
				<view class="agre_header">
					《用户注册协议》2
				</view>
				<view class="agre_body">
					《用户注册协议》《用户注册协议》《用户注册协议》《用户注册协议》《用户注册协议》《用户注册协议》《用户注册协议》《用户注册协议》《用户注册协议》《用户注册协议》《用户注册协议》
				</view>
			</view>
		</uni-drawer>
	</view>
</template>


<style lang="scss" scoped>
	@import './index.scss';
</style>