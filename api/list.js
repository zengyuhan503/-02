import {
	basePostFun,
	baseGetFun
} from "./index.js"
export const login = (params) => {
	return basePostFun('/login', params,true)
}
// http://43.143.65.197:805/api/captcha
export const captcha = () => {
	return basePostFun('/captcha')
}
// http://43.143.65.197:805/api/register
export const register = (params) => {
	return basePostFun('/register', params,true)
}

export const home = () => {
	return basePostFun('/index', )
}
// https://web.dengjw.cn/api/get-user
export const userInfo = () => {
	return baseGetFun('/get-user', )
}

//https://web.dengjw.cn/api/order-list
export const orderList = () => {
	return baseGetFun('/order-list', )
}
// https://web.dengjw.cn/api/update-info
export const updateInfo = (params) => {
	return basePostFun('/update-info', params)
}
// https://web.dengjw.cn/api/apply
export const apply = (params) => {
	return basePostFun('/apply', params)
}
// https://web.dengjw.cn/api/order-detail?order_id=59
export const applyDetail = (params) => {
	return baseGetFun('/order-detail', params)
}
// https://web.dengjw.cn/api/get_content?order_id=57
export const getContent = (params) => {
	return baseGetFun('/get_content', params)
}
// https://web.dengjw.cn/api/order-update
export const uploadSign = (params) => {
	return basePostFun('/order-update', params)
}
// https://web.dengjw.cn/api/cs-message?order_id=65
export const getCsMessage = (params) => {
	return baseGetFun('/cs-message', params)
}
// http://43.143.65.197:806/api/purse
export const getPurse = () => {
	return baseGetFun('/purse')
}
export function uploadFile(tempFilePaths) {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: 'http://43.143.65.197:806/api/upload-image', //仅为示例，非真实的接口地址
			filePath: tempFilePaths,
			name: 'file',
			success: (uploadFileRes) => {
				resolve(uploadFileRes.data)
			},
			fail: err => {
				reject(err)
			}
		});
	})
}