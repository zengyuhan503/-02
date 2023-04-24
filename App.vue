<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
<style>
	@import "@/static/font/iconfont.css";
</style>
<style lang="scss">
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';

	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}

	body,
	html {
		background: #f5f5f9;
	}

	.uni-page-body {
		width: 100%;
		height: 100%;
	}

	view {
		box-sizing: border-box;
	}

	#app {
		overflow-y: auto;
		box-sizing: border-box;
	}

	#app,
	uni-app,
	uni-page,
	uni-page-wrapper {
		height:98% !important;
	}

	uni-page-body {
		width: 100%;
		height: 100%;
	}

	.uni-slider-handle-wrapper {
		height: 17px !important;
	}

	.uni-slider-thumb {
		background: url('../../static/coin.png') no-repeat 100% 100%;
		background-size: cover;
	}
	.uni-row::after {
		content: "" !important;
		display: table !important;
		clear: both !important;
	}
</style>