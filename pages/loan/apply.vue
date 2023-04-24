<script setup lang="ts">
	import { ref, computed } from "vue";
	import VerticalMarquee from '@/pages/components/VerticalMarquee.vue'
	import footerBar from '../components/footer-bar.vue'
	import { onLoad, onShow } from "@dcloudio/uni-app"
	import {
		useCounterStore
	} from '@/stores/config.js'

	let terms = ref(3)
	let money = ref(0)
	let max = ref(0)
	let min = ref(0)
	let maturity = ref([
		{
			text: '3个月',
			value: 3
		}, {
			text: '6个月',
			value: 6
		}, {
			text: '12个月',
			value: 12
		}, {
			text: '24个月',
			value: 24
		}, {
			text: '36个月',
			value: 36
		}, {
			text: '42个月',
			value: 42
		},
	])
	let rll = ref(0);
	const totalPrice = computed(() => {
		return money.value * (1 + rll.value / 100);
	});

	const interestPrice = computed(() => {
		return money.value * (rll.value / 100);
	});
	const monthlyInterestPrice = computed(() => {
		return interestPrice.value / terms.value;
	});
	const monthlyPayment = computed(() => {
		const total = totalPrice.value;
		const monthlyInterest = monthlyInterestPrice.value;
		const months = terms.value;
		return total / months + monthlyInterest;
	});
	let marqueeData = ref([])
	const handleSubmitApply = () => {
		uni.navigateTo({
			url: `/pages/loan/confirmed?money=${money.value}&donemonth=${terms.value}&monthmoney=${monthlyPayment.value}&monthlyInterestPrice=${monthlyInterestPrice.value}&lixi=${interestPrice.value}`
		});
	}
	const handleChangeingMoney = (e) => {
		money.value = e.detail.value
	}
	onShow(() => {
		let userConfig = useCounterStore().getUseConfig
		console.log(userConfig)
		money.value = userConfig.min_ed
		rll.value = userConfig.rll
		min.value = userConfig.min_ed
		max.value = userConfig.max_ed
		marqueeData.value = []
		let phoneList = userConfig.phoneList;
		phoneList.forEach(item => {
			let txt = `${item.date}   ${item.phone}成功借款${item.money}元",`
			marqueeData.value.push(txt)
		})
	})
</script>

<template>
	<view class="page-container">
		<view class="page-header">
			<image src="../../static/banner.jpg" mode="aspectFit"></image>
		</view>
		<view class="page-apply">
			<view class="apply-new-smoney">
				申请金额(元)
			</view>
			<view class="apply-new-money">
				{{money}}
			</view>
			<view class="apply-slider">
				<uni-row>
					<uni-col :span="2">
						<view class="apply-slider-icon">
							<image src="../../static/subtract2.png" mode="aspectFit"></image>
						</view>
					</uni-col>
					<uni-col :span="20">
						<slider :value="money" :step='1000' :max='max' @changing="handleChangeingMoney" :min='min' block-size='44'
							activeColor="#167ccb" background-color="#8ebcda" />
					</uni-col>
					<uni-col :span="2">
						<view class="apply-slider-icon">
							<image src="../../static/plus2.png" mode="aspectFit"></image>
						</view>
					</uni-col>
				</uni-row>
			</view>
			<view class="apply-time">
				<uni-section class="mb-10" title="借款期限" type="line"></uni-section>
				<view class="apply-select-time">
					<uni-row>
						<uni-col :span="6" v-for="(item,index) in maturity " key="index">
							<view class="apply-select-items" @click="terms=item.value">
								<view :class="{'active':item.value===terms}">
									{{item.text}}
								</view>
							</view>
						</uni-col>
					</uni-row>
				</view>
			</view>
			<view class="page-repayment-plan">
				<view class="page-repayment-plan-title">
					每期还款
				</view>
				<view class="page-repayment-plan-info">
					{{monthlyPayment.toFixed(2)}}元 <text>(含月利息 ￥{{monthlyInterestPrice.toFixed(2)}}元)</text>
				</view>
			</view>
		</view>
		<view class="page-submit">
			<button class="button" @click="handleSubmitApply" type="primary">立即申请</button>
		</view>
		<view class="page-marquee">
			<VerticalMarquee :marquee-list="marqueeData" :marquee-height="130" :speed="30" :pause-duration="2000"
				:show-item-count="4">
				<template #marquee-item="{item}">
					<view class="page-marquee-item">{{item}}</view>
				</template>
			</VerticalMarquee>
		</view>
		<view class="" style="height: 100px;">

		</view>
		<footerBar />
	</view>
</template>


<style lang="scss">
	@import './index.scss'
</style>