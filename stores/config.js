// stores/counter.js
import {
	defineStore
} from 'pinia';

export const useCounterStore = defineStore('counter', {
	state: () => {
		return {
			useConfig: {
				max_ed: 50000,
				min_ed: 30000,
				rll: 0.6,
				cs_link: null,
				is_yzm: ("1"),
				phoneList: []
			},
			userStore: {}
		};
	},
	getters: {
		getUseConfig() {
			try {
				let useConfigStorage = uni.getStorageSync('useConfig')
				this.useConfig = JSON.parse(useConfigStorage)
			} catch (e) {}
			return this.useConfig
		},

		GetUser() {
			try {
				let userStoreStorage = uni.getStorageSync('userStore')
				this.userStore = JSON.parse(userStoreStorage)
			} catch (e) {}
			return this.userStore
		},
	},
	actions: {
		setConfig(store) {
			this.useConfig = store
			uni.setStorageSync('useConfig', JSON.stringify(store))
		},

		SetUser(store) {
			this.userStore = store
			uni.setStorageSync('userStore', JSON.stringify(store))
		},
	},
});