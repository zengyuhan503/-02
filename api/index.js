 let urlHost = "http://43.143.65.197:806/api"
 const handleRoot = () => {
 	uni.reLaunch({
 		url: '/pages/index/index'
 	})
 }
 let Tokenvalue = "";
 const handleWatchToken = (isToken) => {
 	return new Promise((resove, reject) => {
 		if (isToken) {
 			resove()
 		} else {
 			uni.getStorage({
 				key: 'Token',
 				success: function(res) {
 					Tokenvalue = res.data
 					resove(Tokenvalue)
 				},
 				fail() {
 					handleToLoginOut()
 				}
 			});
 		}
 	})
 }

 const handleToLoginOut = () => {
 	uni.clearStorage('Token')
 	uni.showToast({
 		icon: 'error',
 		title: '请先登录'
 	})
 	setTimeout(function() {
 		uni.navigateTo({
 			url: '/pages/index/index'
 		})
 	}, 1000);
 }
 const service = (params = {}, isToken) => {
 	return new Promise((resolve, reject) => {
 		handleWatchToken(isToken).then((Tokenvalue) => {
			params.header.token=Tokenvalue
			console.log(params)
 			let requestTask = uni.request({
 				url: urlHost + params?.url,
 				data: params?.data || {},
 				header: params?.header,
 				method: params?.method || "GET",
 				success: res => {
 					resolve(res)
 				},
 				fail: err => {
 					reject(err)
 				}
 			})
 		})

 	})
 }

 //--------------------------base post get function start ---------------------
 export function basePostFun(url, data, isToken = false) {
 	let params = {
 		url: url,
 		method: "POST",
 		data,
 		header: {
 			token: Tokenvalue,
 			"Content-Type": "application/x-www-form-urlencoded"
 		},
 	}
 	return new Promise((resolve, reject) => {
 		service(params, isToken).then(
 			res => {
 				let data = res.data
 				console.log(res)
 				if (res.code == 203 || res.code == 205) {
 					handleToLoginOut()
 					uni.showToast({
 						title: "登录失效，请重新登录",
 						icon: 'none'
 					})
 					reject(data)
 				} else {
 					if (data.code == 200) {
 						resolve(data)
 					} else {
 						uni.showToast({
 							title: data.msg,
 							icon: 'none'
 						})
 						reject(data)
 					}
 				}
 			},
 			err => reject(err),
 		)
 	})
 }

 export function baseGetFun(url, data, isToken = false) {
	 
 	let params = {
 		url,
 		data,
 		header: {
 			token: Tokenvalue,
 			"Content-Type": "application/x-www-form-urlencoded"
 		},
 	}
 	return new Promise((resolve, reject) => {
 		service(params, isToken).then(
 			res => {
 				let data = res.data
 				if (data.code == 203 || data.code == 205) {
 					handleToLoginOut()
 					uni.showToast({
 						title: "登录失效，请重新登录",
 						icon: 'none'
 					})
 					reject(data)
 				} else {
 					if (data.code == 200) {
 						resolve(data)
 					} else {
 						uni.showToast({
 							title: data.msg,
 							icon: 'none'
 						})
 						reject(data)
 					}
 				}
 			},
 			err => reject(err),
 		)
 	})
 }


 //--------------------------base post get function end ---------------------