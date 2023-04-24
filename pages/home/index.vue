<script setup lang="ts">
	import { ref, reactive, onMounted } from "vue";
	import footerBar from '../components/footer-bar.vue'
	import { onLoad,onShow } from "@dcloudio/uni-app"
	import moFab from "../components/mo-fab/mo-fab.vue"
	import { home ,userInfo} from '@/api/list.js'
	import {
		useCounterStore
		
	} from '@/stores/config.js'
	import VerticalMarquee from '@/pages/components/VerticalMarquee.vue'
	let pattern = ref({
		color: '#7A7E83',
		backgroundColor: 'rgb(82, 111, 241)',
		selectedColor: 'rgb(82, 111, 241)',
		buttonColor: 'rgb(82, 111, 241)',
	})
	let useStore = useCounterStore()
	let marqueeData = ref([])
	let swiperDotIndex = ref(0)
	let info = ref([{
		colorClass: 'uni-bg-red',
		content: '内容 A'
	},
	{
		colorClass: 'uni-bg-green',
		content: '内容 B'
	},])
	let current = ref(0)
	let mode = ref('default')
	const change = (e) => {
		current.value = e.detail.current
	}
	
	const getUserInfo = () => {
		userInfo().then((res) => {
			console.log(res)
			let data = res.data;
			useStore.SetUser(data)
		})
	}
	const handleGetHomeInfo = () => {
		home().then((res) => {
			marqueeData.value = []
			if (res.code != 200) {
				return false
			}
			let phoneList = res.data.phoneList;
			phoneList.forEach(item => {
				let txt = `${item.date}   ${item.phone}成功借款${item.money}元",`
				marqueeData.value.push(txt)
			})
			let config = res.data;
			useStore.setConfig(config)
		})
	}
	const handleToservice=()=>{
		uni.navigateTo({
			url:'/pages/service/index'
		})
	}
	onShow(() => {
		handleGetHomeInfo()
		getUserInfo()
	})
</script>
<template>
	<view class="page-container">
		<view class="page-header">
			<uni-row class="demo-uni-row">
				<uni-col :span="19">
					<view class="header-text">轻松借</view>
				</uni-col>
				<uni-col :span="4" :offset="1">
					<view class="" style="text-align: right;">
						<uni-icons type="chat" size="40" @click="handleToservice" color='#ffffff'></uni-icons>
					</view>
				</uni-col>
			</uni-row>
			<uni-row class="demo-uni-row">
				<uni-col :span="19">
					<view class="header-desc">
						实力平台安心可靠
					</view>
				</uni-col>
			</uni-row>
		</view>
		<view class="page-body">
			<view class="page-card">
				<view class="page-card-title">
					优先放款—快速提现
				</view>
				<view class="page-card-desc">
					最高可借额度（元）
				</view>
				<view class="page-card-money">
					<view class="page-card-moneyNum">
						{{useStore.getUseConfig.max_ed}}
					</view>
					<view class="page-card-moneyapply">
						<navigator url="/pages/loan/apply" open-type="redirect">
							<button :pattern="pattern" class="button" type="primary">
								点我申请额度
							</button>
						</navigator>
					</view>
				</view>
				<view class="page-card-waring">
					<uni-row class="demo-uni-row">
						<uni-col :span="12">
							<view class="waring-text">
								<text>·</text>极速放款
							</view>
						</uni-col>
						<uni-col :span="12">
							<view class="waring-text">
								<text>·</text>最低日利息0.032%
							</view>
						</uni-col>

						<uni-col :span="12">
							<view class="waring-text">
								<text>·</text>灵活审批
							</view>
						</uni-col>

						<uni-col :span="12">
							<view class="waring-text">
								<text>·</text>用多久还多久的利息
							</view>
						</uni-col>
					</uni-row>
				</view>
			</view>
			<view class="page-marquee">
				<VerticalMarquee :marquee-list="marqueeData" :marquee-height="100" :speed="30" :pause-duration="2000"
					:show-item-count="4">
					<template #marquee-item="{item}">
						<view class="page-marquee-item">{{item}}</view>
					</template>
				</VerticalMarquee>
			</view>
			<view class="page-image-swiper">
				<uni-swiper-dot class="uni-swiper-dot-box" :info="info" :current="current" :mode="mode" field="content">
					<swiper :circular='true' :autoplay='true' class="swiper-box" :current="swiperDotIndex" @change="change">
						<swiper-item>
							<view class="swiper-item">
								<image src="../../static/swiper1.png" mode="aspectFit"></image>
							</view>
						</swiper-item>
						<swiper-item>
							<view class="swiper-item">
								<image src="../../static/swiper2.png" mode="aspectFit"></image>
							</view>
						</swiper-item>
					</swiper>
				</uni-swiper-dot>
			</view>
			<view class="page-new-setp">
				<uni-row class="demo-uni-row">
					<uni-col :span="11">
						<view class="setp-text">
							新手有礼
						</view>
					</uni-col>
					<uni-col :span="13">
						<view class="setp-desc" style="  ">
							仅需4步，新人专享急速放款
						</view>
					</uni-col>
				</uni-row>
				<view class="page-setp-items">
					<uni-row class="demo-uni-row">
						<uni-col :span="6">
							<view class="page-setp-item">.
								<uni-icons custom-prefix="iconfont" color="#526ff1" type="icon-shimingrenzheng" size="30"></uni-icons>
								<view class="" style="color: #526ff1;">
									实名认证
								</view>
							</view>
						</uni-col>
						<uni-col :span="6">
							<view class="page-setp-item">.
								<uni-icons custom-prefix="iconfont" color="#f8f8f8" type="icon-shenhetongguo" size="30"></uni-icons>
								<view class="">
									审核通过
								</view>
							</view>
						</uni-col>
						<uni-col :span="6">
							<view class="page-setp-item">.
								<uni-icons custom-prefix="iconfont" color="#f8f8f8" type="icon-tixian" size="30"></uni-icons>
								<view class="">
									提现
								</view>
							</view>
						</uni-col>
						<uni-col :span="6">
							<view class="page-setp-item">.
								<uni-icons custom-prefix="iconfont" color="#f8f8f8" type="icon-zhanghuyue" size="30"></uni-icons>
								<view class="">
									极速到账
								</view>
							</view>
						</uni-col>
					</uni-row>
				</view>
			</view>
		</view>
		<footerBar />
		<mo-fab />
	</view>
</template>


<style lang="scss">
	@import './index.scss';
</style>