module.exports = {
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