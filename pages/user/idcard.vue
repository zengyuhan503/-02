<script setup lang="ts">
	import { ref, reactive } from "vue";
	import { onLoad, onShow } from "@dcloudio/uni-app"
	import { userInfo, uploadFile, updateInfo } from '@/api/list.js'
	import id_cardImg from "@/static/uppic1.png"
	import id_cardImg2 from '@/static/uppic1.png'
	import id_cardImg3 from '@/static/uppic3.png'

	let basicsInfo = reactive({
		username: "测试人员",
		idcard: "511029199706281837",
		imgo: id_cardImg,
		imgt: id_cardImg2,
		imgth: id_cardImg3,
	})
	let idCardImage = reactive({
		imgo: null,
		imgt: null,
		imgth: null,
	})
	function isIDCard(codeStr) {
		const myreg =
			/^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/
		if (!myreg.test(codeStr)) {
			return false
		} else {
			return true
		}
	}
	const getUserInfo = () => {
		userInfo().then((res) => {
			let data = res.data;
			for (let key in basicsInfo) {
				basicsInfo[key] = data[key]
			}
		})
	}
	const handleChooseImageFile = (type) => {
		uni.chooseImage({
			count: 1,
			sizeType: ['compressed'],
			sourceType: ['album'], //从相册选择
			success: (res) => {
				uploadFile(res.tempFilePaths[0]).then(uri => {
					let data = JSON.parse(uri)
					basicsInfo[type] = data.data;
					idCardImage[type] = data.data;
				})
			}
		})
	}
	const handleSubmit = () => {
		let params = {
			...basicsInfo
		}
		let { imgo, imgt, imgth } = idCardImage;
		if (![imgo, imgt, imgth].every(Boolean)) {
			uni.showToast({ title: '请上传身份证相关图片', icon: 'error' });
			return false;
		}
		if (!isIDCard(params.idcard)) {
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
	onShow(() => {
		getUserInfo()
	})
</script>
<template>
	<view class="page-container">
		<view class="page-idCard">
			<view class="page-waring">
				填写真实有效的信息，审核才会通过哦~
			</view>
			<view class="page-idCard-form">
				<uni-forms :modelValue="basicsInfo" label-width='80px'>
					<uni-forms-item label="姓名" name="name" required>
						<uni-easyinput type="text" v-model="basicsInfo.username" placeholder="请输入姓名" />
					</uni-forms-item>
					<uni-forms-item label="身份证号" name="idCard" required>
						<uni-easyinput type="text" v-model="basicsInfo.idcard" placeholder="请输入身份证号" />
					</uni-forms-item>
				</uni-forms>
			</view>
			<view class="page-waring">
				*须本人身份证，且内容清晰可辨
			</view>
			<view class="page-waring">
				*请您确认拍照权限已开启
			</view>
			<view class="page-idCard-upimage">
				<view class="upload_idCard upload_idCard_img1" @click="handleChooseImageFile('imgo')">
					<image :src="basicsInfo.imgo" mode="aspectFill"></image>
					<view class="upload_idCard_up">
						<image src="../../static/hcamera.png" mode="aspectFill"></image>
						<view class="upload_idCard_text">
							身份证正面照上传
						</view>
					</view>
				</view>
			</view>
			<view class="page-idCard-upimage">
				<view class="upload_idCard upload_idCard_img1" @click="handleChooseImageFile('imgt')">
					<image :src="basicsInfo.imgt" mode="aspectFill"></image>
					<view class="upload_idCard_up">
						<image src="../../static/hcamera.png" mode="aspectFill"></image>
						<view class="upload_idCard_text">
							身份证背面照上传
						</view>
					</view>
				</view>
			</view>
			<view class="page-idCard-upimage">
				<view class="upload_idCard upload_idCard_img1" @click="handleChooseImageFile('imgth')">
					<image :src="basicsInfo.imgth" mode="aspectFill"></image>
					<view class="upload_idCard_up">
						<image src="../../static/hcamera.png" mode="aspectFill"></image>
						<view class="upload_idCard_text">
							本人上半身照上传
						</view>
					</view>
				</view>
			</view>
			<view class="page-loginOut">
				<button class="button" @click="handleSubmit" type="primary">下一步</button>
			</view>
		</view>

	</view>
</template>


<style lang="scss">
	@import 'index.scss'
</style>