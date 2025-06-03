module.exports = {
	baseUrl: './',
	assetsDir: 'static',
	productionSourceMap: false,
	devServer: {
		proxy: {
			'/api': {
				target: 'https://www.bugbustersclub.cn',
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
}