<script setup lang="ts">
	import { ref, reactive } from "vue";
	import { onLoad, onShow } from "@dcloudio/uni-app"
	import { orderList } from '@/api/list.js'
	let orders = ref([])
	const handleGetOrderList = () => {
		orderList().then((res) => {
			console.log(res)
			orders.value = res.data;
			for (let i = 0; i < orders.value.length; i++) {
				let item = orders.value[i];
				let title = `金额：￥${item.money}元 `
				let note = `月供：￥${item.monthmoney}元X${item.donemonth}期`
				orders.value[i].title = title
				orders.value[i].note = note
			}
		})
	}
	const handleGetStatus = (status) => {
		// //状态：1=待审核， -1=审核失败，2=审核通过，3=申请提现，4=放款中，5=已完成
		let str = {
			1: "待审核",
			"-1": "审核失败",
			2: "审核通过",
			3: "申请提现",
			4: "放款中",
			5: "已完成",
		}
		return str[status]
	}
	
	onShow(() => {
		handleGetOrderList()
	})
</script>
<template>
	<view class="page-container page-bill">
		<uni-card spacing='0px' padding='0px' v-for="(item,index) in orders">
			<template v-slot:title>
				<uni-list>
					<uni-list-item title="" link='navigateTo' :to="`/pages/loan/progress?id=${item.id}`">
						<template v-slot:header>
							<view class="slot-box">
								<text style="font-size: 11px;">借款编号：{{item.order_no}}</text>
							</view>
						</template>
						<template v-slot:footer>
							<text style="color:#f90006;font-size: 11px;"  :class="{'colorF90006': (item.status!=1&&item.status!=-1)}" >{{handleGetStatus(item.status)}}</text>
						</template>
					</uni-list-item>
				</uni-list>
			</template>
			<view class="">
				<uni-list-chat :title="item.title" :note='item.note' avatar="../../static/bill.png" />
			</view>
		</uni-card>
	</view>
</template>


<style lang="scss">
	@import "./index.scss";
</style>
<style>
	.colorF90006{
		color: chartreuse !important; 
	}
</style>