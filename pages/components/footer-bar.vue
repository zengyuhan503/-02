<script setup lang="ts">
	import { onMounted, ref } from "vue";
	let active = ref(1)
	onMounted(() => {
		const pages = getCurrentPages();
		// 获取当前页面实例
		const currentPage = pages[pages.length - 1];
		// 获取当前页面路由地址
		const route = currentPage.route;
		switch (route) {
			case "pages/home/index":
				active.value = 1
				break;
			case "pages/wallet/index":
				active.value = 2
				break;
			case "pages/user/index":
				active.value = 4
				break;
			default:
				break;
		}
	})
</script>
<template>
	<view class="footer-nav">
		<uni-grid :column="4" :showBorder="false" :square="false">
			<uni-grid-item>
				<navigator url="/pages/home/index" open-type="navigate" :class="{'active':active==1}">
					<uni-icons custom-prefix="iconfont" :color="active==1?'#7457ea':'#9E9E9E'" type="icon-shouye"
						size="20"></uni-icons>
					<view>首页</view>
				</navigator>
			</uni-grid-item>
			<uni-grid-item>
				<navigator url="/pages/wallet/index" open-type="navigate" :class="{'active':active==2}">
					<uni-icons custom-prefix="iconfont" :color="active==2?'#7457ea':'#9E9E9E'" type="icon-qianbao"
						size="20"></uni-icons>
					<view class="">
						钱包
					</view>
				</navigator>
			</uni-grid-item>
			<uni-grid-item>
				<navigator url="/pages/service/index" open-type="navigate" :class="{'active':active==3}">
					<uni-icons custom-prefix="iconfont" :color="active==3?'#7457ea':'#9E9E9E'" type="icon-rengongkefu"
						size="20"></uni-icons>
					<view class="">
						客服
					</view>
				</navigator>
			</uni-grid-item>
			<uni-grid-item>
				<navigator url="/pages/user/index" open-type="navigate" :class="{'active':active==4}">
					<uni-icons custom-prefix="iconfont" :color="active==4?'#7457ea':'#9E9E9E'" type="icon-gerenzhongxin"
						size="20"></uni-icons>
					<view class="">
						我的
					</view>
				</navigator>
			</uni-grid-item>
		</uni-grid>
	</view>
</template>

<style lang="scss">
	.footer-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		box-shadow: 0px 0px 2px #000;
		background: #f8f8f9;
		padding: 5px 0;

		.uni-grid-item {
			height: auto !important;
			text-align: center;

			& .active {
				color: #7457ea;
			}

			.uni-icons {
				margin-bottom: 5px;
			}


		}
	}
</style>