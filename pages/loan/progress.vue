<script setup lang="ts">
	import { ref, reactive } from "vue";
	import { applyDetail, getContent, uploadFile, uploadSign } from '@/api/list.js'
	import { onLoad, onShow } from "@dcloudio/uni-app"
	import myPopup from '@/pages/components/sign.vue'
	let orderInfo = reactive({
		"id": 62,
		"user_id": 89,
		"order_no": null,
		"money": "",
		"monthmoney": "",
		"donemonth": 3,
		"status": 2,
		"message": "",
		"lixi": "",
		"fail_msg": "",
		"user": {
			"id": 89,
			"phone": "",
			"username": "",
			"bankname": "",
			"bankid": ""
		}
	})

	var content = null;
	var touchs = [];
	var canvasw = 0;
	var canvash = 0;
	var _that;
	let vhtmlsImg = ref('')
	let vhtmlsImgShow = ref(true)
	let signImage = ref('')
	let isEnd = ref(false)
	let isShow = ref(false)
	const hanldeGetAppDetail = (id) => {
		let params = {
			order_id: id
		}
		applyDetail(params).then((res) => {
			let data = res.data;
			for (let key in data) {
				orderInfo[key] = data[key]
			}
		})
	}
	let contract = ref(``)
	const hanldeGetContract = (id) => {
		let params = {
			order_id: id
		}
		getContent(params).then((res) => {
			let data = res.data;
			let vhtmls = data.replace(/\<p/g, "<view")
			vhtmls = data.replace(/\p>/g, "view></br>")
			contract.value = vhtmls;
			vhtmlsImg.value = res.data.contract_logo
		})
	}
	let contractPopup = ref(null)
	const handleOpenContract = () => {
		contractPopup.value.open('bottom')
	}
	let orderId = 67

	const hide = () => {
		isShow.value = false
	}
	const overSign = () => {
		if (isEnd.value) {
			uni.canvasToTempFilePath({
				canvasId: 'firstCanvas',
				success: function (res) {
					signImage.value = res.tempFilePath;
					uploadFileFun(res.tempFilePath)
				}
			})
			hide()
			clearClick()
		} else {
			uni.showToast({
				title: '请先完成签名',
				icon: "none",
				duration: 1500,
				mask: true
			})
		}
	}
	let sign_img = ref(null)
	const uploadFileFun = (tempFilePaths) => {
		uploadFile(tempFilePaths).then(res => {
			let data = JSON.parse(res)
			sign_img.value = data.data;
			let params = {
				order_id: orderId,
				sign_img: sign_img.value
			}
			uploadSign(params).then(res => {
				console.log(res)
				uni.navigateTo({
					url: '/pages/loan/pending?order_id=' + orderId
				})
			}).catch(err => {
				console.log(err)
			})
		})
	}
	const start = (event) => {
		// console.log(event)
		// console.log("触摸开始" + event.changedTouches[0].x)
		// console.log("触摸开始" + event.changedTouches[0].y)
		//获取触摸开始的 x,y
		let point = {
			x: event.changedTouches[0].x,
			y: event.changedTouches[0].y
		}
		// console.log(point)
		touchs.push(point);
	}
	const move = (e) => {
		let point = {
			x: e.touches[0].x,
			y: e.touches[0].y
		}
		// console.log(point)
		touchs.push(point)
		if (touchs.length >= 2) {
			draw()
		}
	}

	const cancel = function (e) { }

	// 画布的长按手势响应
	const tap = function (e) { }
	//画布触摸错误
	const error = function (e) { }
	const draw = () => {
		let point1 = touchs[0]
		let point2 = touchs[1]
		touchs.shift()
		content.moveTo(point1.x, point1.y)
		content.lineTo(point2.x, point2.y)
		content.stroke()
		content.draw(true)
	}
	//清除操作
	const clearClick = function () {
		// 设置为未签名
		isEnd.value = false
		//清除画布
		content.clearRect(0, 0, canvasw, canvash)
		content.draw(true)
	}
	const end = () => {
		isEnd.value = true
		touchs.pop()
	}
	onLoad((obj) => {
		console.log(obj)
		orderId = obj.id;
		hanldeGetAppDetail(orderId)
		hanldeGetContract(orderId)
		//获得Canvas的上下文
		content = uni.createCanvasContext('firstCanvas', _that)
		//设置线的颜色
		content.setStrokeStyle("#000")
		//设置线的宽度
		content.setLineWidth(5)
		//设置线两端端点样式更加圆润
		content.setLineCap('round')
		//设置两条线连接处更加圆润
		content.setLineJoin('round')
	})
</script>
<template>
	<view class="page-container">
		<view class="page-title">
			借款进度
		</view>
		<view class="page-bill-progress">
			<view class="page-bill-mony">
				借款审批 <text style="color: red;"> ￥{{orderInfo.money}}元</text>
			</view>
			<view class="page-bill-progress-item">
				<uni-steps active-color='#fd6f00' :options="[{title: '正在审核'}, {title: '审核通过'}, {title: '放款中'}, {title: '到账成功'}]"
					:active="(orderInfo.status-1)">
				</uni-steps>
			</view>
		</view>
		<view class="page-title">
			借款详情
		</view>
		<view class="page-bill-info">
			<view class="page-bill-info-item">
				<uni-row>
					<uni-col :span="5">
						<view class="info-title">借款编号</view>
					</uni-col>
					<uni-col :offset="1" :span="15">
						<view class="info-desc">{{orderInfo.order_no}}</view>
					</uni-col>
				</uni-row>
			</view>
			<view class="page-bill-info-item">
				<uni-row>
					<uni-col :span="5">
						<view class="info-title">借款金额</view>
					</uni-col>
					<uni-col :offset="1" :span="15">
						<view class="info-desc">￥{{orderInfo.money}}元</view>
					</uni-col>
				</uni-row>
			</view>
			<view class="page-bill-info-item">
				<uni-row>
					<uni-col :span="5">
						<view class="info-title">借款期限</view>
					</uni-col>
					<uni-col :offset="1" :span="15">
						<view class="info-desc">{{orderInfo.donemonth}}月</view>
					</uni-col>
				</uni-row>
			</view>
			<view class="page-bill-info-item">
				<uni-row>
					<uni-col :span="5">
						<view class="info-title">到账银行</view>
					</uni-col>
					<uni-col :offset="1" :span="15">
						<view class="info-desc">{{orderInfo.user.bankname}}</view>
					</uni-col>
				</uni-row>
			</view>
			<view class="page-bill-info-item">
				<uni-row>
					<uni-col :span="5">
						<view class="info-title">银行卡号</view>
					</uni-col>
					<uni-col :offset="1" :span="15">
						<view class="info-desc">{{orderInfo.user.bankid}}</view>
					</uni-col>
				</uni-row>
			</view>
			<view class="page-bill-info-item">
				<uni-row>
					<uni-col :span="5">
						<view class="info-title">收款户名</view>
					</uni-col>
					<uni-col :offset="1" :span="15">
						<view class="info-desc">{{orderInfo.user.username}}</view>
					</uni-col>
				</uni-row>
			</view>

			<view class="page-bill-info-item">
				<uni-row>
					<uni-col :span="5">
						<view class="info-title">收款手机号</view>
					</uni-col>
					<uni-col :offset="1" :span="15">
						<view class="info-desc">{{orderInfo.user.phone}}</view>
					</uni-col>
				</uni-row>
			</view>
			<!-- <view class="page-bill-info-item">
				<uni-row>
					<uni-col :span="5">
						<view class="info-title">每月还款</view>
					</uni-col>
					<uni-col :offset="1" :span="15">
						<view class="info-desc">￥{{orderInfo.money/orderInfo.donemonth}}元</view>
					</uni-col>
				</uni-row>
			</view> -->
			<view class="page-bill-info-item">
				<uni-row>
					<uni-col :span="5">
						<view class="info-title">还款说明</view>
					</uni-col>
					<uni-col :offset="1" :span="18">
						<view class="info-desc">您需要在每月10日前或者当天 ，进入我的还款列表，进行还款</view>
					</uni-col>
				</uni-row>
			</view>
			<view class="page-submit" style="margin-top: 20px;">
				<button class="button" type="primary" @click="handleOpenContract">立即提现</button>
				<view class="page-open-contract" @click="handleOpenContract">
					查看 <text style="color: #fd6f00;">《 借款合同 》</text>
				</view>
			</view>
		</view>
		<uni-popup ref="contractPopup" type="bottom">
			<view class="page-contract-body">
				<image :src="vhtmlsImg" v-if="vhtmlsImgShow" class="contractImage"></image>
				<view class="contract_vhtmls" v-html="contract">
				</view>
				<view v-if='signImage' style='text-align: right;'>
					<image :src='signImage' style='width:200rpx;height:100rpx;'></image>
				</view>
				<button class="button" type="primary" @click="isShow=true">确认提现</button>
			</view>
		</uni-popup>
		<myPopup ref="pop" @hide='hide' v-if="isShow">
			<view class="propView" style=''>
				<view class="prpHide" style='' @click='hide'>X</view>
				<view class="prpStart" style=''>
					开始签名（确定签名无误后点击申请）</view>
				<canvas class='firstCanvas' canvas-id="firstCanvas" @touchmove='move' @touchstart='start($event)'
					@touchend='end' @touchcancel='cancel' @longtap='tap' disable-scroll='true' @error='error'>
				</canvas>
				<view class="caozuo">
					<view class="chongqian" @tap='clearClick'>
						重签
					</view>
					<view class="over" @click="overSign">
						确定申请
					</view>
				</view>
			</view>
		</myPopup>
	</view>
</template>



<style lang="scss">
	@import "./index.scss";
</style>