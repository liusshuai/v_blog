const CompressionPlugin = require("compression-webpack-plugin")
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/dist' : '/',
    productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
    chainWebpack: (config) => {
        config.plugins.delete('prefetch')
    },
    configureWebpack: () => {
        if (process.env.NODE_ENV === 'production') {
            return {
                plugins: [
                    new CompressionPlugin({
                        test: /\.js$|\.html$|\.css/, //匹配文件名
                        threshold: 10240, //对超过10k的数据压缩
                        deleteOriginalAssets: false //不删除源文件
                    })
                ]
            }
        }
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:3002',
                ws: true, //是否代理websockets
                changeOrigin: true // 设置同源  默认false，是否需要改变原始主机头为目标URL
            }
        }
    }
};