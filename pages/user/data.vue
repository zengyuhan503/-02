<script setup lang="ts">
	import { ref, reactive } from "vue";
	import { onLoad, onShow } from "@dcloudio/uni-app"
	import { isPhone } from '../../utils/reg.js'
	import { userInfo, updateInfo } from '@/api/list.js'
	let formData = reactive({
		linkname: "case",
		linkphone: "13458685626",
		linknote: null,
		fdname: "cae2",
		fdphone: "13458685628",
		fdnote: null
	})
	let range = ref([
		{ value: "父母", text: "父母" },
		{ value: "同事", text: "同事" },
		{ value: "兄妹", text: "兄妹" },
		{ value: "朋友", text: "朋友" },
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
		if (!isPhone(formData.linkphone) && !isPhone(formData.fdphone)) {
			uni.showToast({
				title: '手机号填写错误',
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
	<view class="page-container page-back">
		<view class="page-waring">
			填写真实有效的信息，审核才会通过哦~
		</view>
		<view class="page-selec-form">
			<uni-section class="mb-10" title="直属亲属联系方式" type="line"></uni-section>
			<uni-forms :modelValue="formData" label-width='80px'>
				<uni-forms-item label="姓名" name="linkname" required>
					<uni-easyinput type="text" v-model="formData.linkname" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item label="电话" name="idCard" required>
					<uni-easyinput type="text" v-model="formData.linkphone" placeholder="请输入电话" />
				</uni-forms-item>
				<uni-forms-item label="关系" name="idCard" required>
					<uni-data-select v-model="formData.linknote" :localdata="range"></uni-data-select>
				</uni-forms-item>
			</uni-forms>
			<uni-section class="mb-10" title="其他联系人" type="line"></uni-section>
			<uni-forms :modelValue="formData" label-width='80px'>
				<uni-forms-item label="姓名" name="name" required>
					<uni-easyinput type="text" v-model="formData.fdname" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item label="电话" name="idCard" required>
					<uni-easyinput type="text" v-model="formData.fdphone" placeholder="请输入电话" />
				</uni-forms-item>
				<uni-forms-item label="关系" name="idCard" required>
					<uni-data-select v-model="formData.fdnote" :localdata="range"></uni-data-select>
				</uni-forms-item>
			</uni-forms>

			<view class="page-loginOut">
				<button class="button" type="primary" @click="handleSubmit">下一步</button>
			</view>
		</view>
	</view>
</template>


<style lang="scss">
	@import 'index.scss'
</style>