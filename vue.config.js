import { defineConfig } from 'vite'

export default defineConfig({
	  server: {
	    host: '172.28.249.154',
	    port: 8090,
	    https: false,
	    proxy: {
	      '/console/workorder': {
	        target: 'http://192.168.1.213/cms',
	        changeOrigin: true,
	      },
	      '/console': {
	        target: 'https://console-stage.skyworthxr.com/cms',
	        changeOrigin: true,
	        rewrite: (path) => path.replace(/^\/console/, '/console')
	      },
	      '/sport': {
	        target: 'http://192.168.50.166:8080/cms',
	        changeOrigin: true,
	        rewrite: (path) => path.replace(/^\/sport/, '')
	      },
	    },
	
	  },
})