<template>
	<view class="form_box">
		<view class="contract">
			<image :src="vhtmlsImg" v-if="vhtmlsImgShow" class="contractImage"></image>
			<view class="contract_vhtmls" v-html="contract">
			</view>
			<view v-if='signImage' style='text-align: right;'>
				<image :src='signImage' style='width:200rpx;height:100rpx;'></image>
			</view>

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
			<view class="" style="text-align:center;">
				<fui-button radius="96rpx" :margin="['30px','0']" @click="isShow=true" size='30px' width='90%'
					style="margin:30px auto;">
					申请额度
				</fui-button>
			</view>
		</view>
	</view>

</template>

<script setup>
	import { onLoad, onShow } from "@dcloudio/uni-app"
	import {
		getContent
	} from "@/api/list.js"
	import {
		reactive,
		ref,
		onActivated,
		onMounted
	} from 'vue'
	import myPopup from '@/pages/components/sign.vue'
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
	const hide = () => {
		isShow.value = false
	}
	const overSign = () => {
		if (isEnd.value) {
			uni.canvasToTempFilePath({
				canvasId: 'firstCanvas',
				success: function(res) {
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
	
	const uploadFileFun = (tempFilePaths) => {
		uploadFile(tempFilePaths).then(res => {
			let data = JSON.parse(res)
			sign_img.value = data.data;
			// const user_id = uni.getStorageSync('user_id');
			// let params = {
			// 	id: user_id,
			// 	sign_img: sign_img.value
			// }
			// uploadSign(params).then(res => {
			// 	toPending()
			// }).catch(err => {
			// 	console.log(err)
			// })
		})
	}
	const handleStartSign = () => {

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
			draw(touchs)
		}
	}

	const cancel = function(e) {}

	// 画布的长按手势响应
	const tap = function(e) {}
	//画布触摸错误
	const error = function(e) {}
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
	const clearClick = function() {
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
	let contract = ref(null)
	const hanldeGetContract = (id) => {
		let params = {
			order_id: id
		}
		getContent(params).then((res) => {
			let data = res.data;
			vhtmlsImg.value = res.data.contract_logo
			let vhtmls = data.replace(/\<p/g, "<view")
			vhtmls = data.replace(/\p>/g, "view></br>")
			contract.value = vhtmls;
		})
	}

	let orderId = 67
	onLoad((obj) => {
		orderId = obj?.id;
		hanldeGetContract(orderId)
	})
	onMounted(() => {
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

<style lang="scss" scoped>
	.form_box {
		padding: 20px;
		background: url('../../static/back01.jpg');

	}

	.essential_info {
		box-shadow: 0px 0px 3px #000;
		border-radius: 12px;
		box-sizing: border-box;
		overflow: hidden;
		background: #ffffff;

		.title {
			margin: 20px;
			text-align: center;
			color: #2196F3;
		}

		.desc {
			height: 36px;
			text-align: center;
			font-size: 12px;
			color: #9E9E9E;
		}
	}

	.sign {
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
		border: 1px solid #ddd;
	}

	.id_card {
		padding: 15px 8px;
		background: #ffffff;

		image {
			height: 200px;
			width: 100%;
			margin-top: 20px;
		}
	}
</style>


<style>
	.fui-input__wrap {
		/* background: none !important; */
	}

	.ts {
		color: #FF485D;
		font-size: 30upx;
		height: 100upx;
		line-height: 100upx;
		padding-left: 20upx;
	}

	canvas {
		background-color: #f2f2f2;
		width: 100%;
		height: 20vh;
		/* margin: 0 25upx; */
		/* height: calc(100vh - 140upx); */
	}

	.contents {
		padding-top: 20upx;
		padding-bottom: 100upx;
		box-sizing: border-box;
	}

	#signatureImg {
		background-color: #EEEEEE;
	}

	.caozuo1 {
		display: flex;
		height: 0;
		height: constant(safe-area-inset-bottom);
		height: env(safe-area-inset-bottom);
		width: 750upx;
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: #0599D7;
	}

	.caozuo {
		display: flex;
		height: 100rpx;
		width: 100%;
		margin-top: 20rpx;
		font-size: 28rpx;

	}

	.caozuo view {
		width: 40%;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		color: #FFFFFF;
		margin-left: 5%;
		border-radius: 40rpx;
	}

	.caozuo view:last-child {
		width: 40%;
		text-align: center;
		height: 80rpx;
		line-height: 80rpx;
		color: #FFFFFF;
		margin-left: 10%;
	}

	.caozuo view:active {
		background-color: #CCCCCC;
		color: #333333;
	}

	.chongqian {
		background-color: #FF8F58;
	}

	.over {
		background-color: #0599D7;
	}

	.propView {
		background-color: #FFFFFF;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
	}

	.prpHide {
		margin-left: 92%;
		margin-bottom: 10rpx;
		width: 40rpx;
		height: 40rpx;
		font-size: 26rpx;
		line-height: 40rpx;
		background-color: #000000;
		opacity: 0.5;
		border-radius: 20rpx;
		text-align: center;
		position: fixed;
		bottom: 34.5%;
		z-index: 3000;
		left: 0rpx;
		color: #FFFFFF
	}

	.prpStart {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 30rpx;
		font-weight: bold;
		text-align: center;
	}

	.contract {
		padding: 20px;
		box-shadow: 0px 0px 3px #000;
		border-radius: 12px;
		box-sizing: border-box;
		overflow: hidden;
		background: #ffffff;
	}

	.contract_vhtmls {
		height: 100%;
		overflow: auto;
		display: block;
		white-space: pre-wrap;
		word-wrap: break-word
	}
</style>
<style>
	table {
		border: 1px solid #EEEEEE;
		background: #EEEEEE;
	}

	.tablec {
		border: 1px solid #EEEEEE;
		background: #EEEEEE;
	}

	.contractImage {
		position: absolute;
		right: 30px;
		top: 50px;
		width: 100px;
		height: 100px;
	}
</style>