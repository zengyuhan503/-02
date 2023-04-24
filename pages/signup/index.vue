<script setup lang="ts">
	import { ref, reactive } from "vue";
	import { onLoad } from "@dcloudio/uni-app"
	import { register, captcha,login } from '@/api/list.js'
	import { isPhone } from '../../utils/reg.js'
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
		// uni.navigateTo({
		// 	url: '/pages/home/index'
		// });
		if (!isAgreement.value) {
			uni.showToast({
				title: '请先同意协议',
				icon: 'error'
			})
			return false
		}
		if (!isPhone(formData.phone)) {
			uni.showToast({
				title: '手机号填写错误',
				icon: 'error'
			})
			return false
		}
		let params = {
			...formData
		}
		register(params).then((res => {
			console.log(res)
			if (res.code != 200) {
				uni.showToast({
					title: res.msg,
					icon: 'error'
				})
			}else{
				login(params).then((res)=>{
					console.log(res)
				})
			}
		}))
	}
	const handleSubmitToLogin = () => {
		uni.navigateTo({
			url: '/pages/index/index'
		});
	}
	let captchaImage = ref(null)
	const GetCaptchaImage = () => {
		captcha().then(res => {
			console.log(res)
		})
	}
	onLoad(() => {
		// GetCaptchaImage()
	})
</script>
<template>
	<view class="page-container">
		<view class="login-header">
			<!-- 			<view class="login-heade-txt">
				随借随还
			</view>
			<view class="login-heade-txt">
				无需<text>等待</text>
			</view> -->
		</view>
		<view class="login-body">
			<view class="login-form">
				<view class="login-title">
					欢迎注册
				</view>
				<view class="login-input">
					<uni-forms class="forms-item">
						<uni-easyinput :inputBorder="false" v-model="formData.phone" placeholder="输入你的手机号">
						</uni-easyinput>
						<!-- <view class="input-verification">
							<uni-easyinput :inputBorder="false" v-model="formData.phone" placeholder="输入验证码">
							</uni-easyinput>
							<view class="captchaImg">
								<image src="https://web.dengjw.cn/api/" mode="aspectFit"></image>
							</view>
						</view> -->
						<uni-easyinput :inputBorder="false" type="password" v-model="formData.password"
							placeholder="请输入你设置的密码"></uni-easyinput>
					</uni-forms>
					<button class="button" type="primary" @click="handleSubmitToHome">注册</button>
					<view class="login-xieyi">
						<uni-data-checkbox multiple v-model="isAgreement" :localdata="checkAgreement"></uni-data-checkbox>
						同意 <text @click="ShowSginAgreement">《注册协议》</text>，<text @click="ShowPrivacyAgreement">《隐私政策协议》</text>
					</view>
				</view>
			</view>
		</view>
		<view class="forget-pwd">
			已有账户， <text @click="handleSubmitToLogin">返回登录</text>
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


<style lang="scss">
	@import './index.scss';
</style>