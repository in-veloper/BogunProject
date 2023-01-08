// const { createProxyMiddleware } = require('http-proxy-middleware');

// //https://open.neis.go.kr/hub/schoolInfo

// module.exports = function (app) {
//     app.use(
//         '/api',
//         createProxyMiddleware('/api', {
//             target: 'https://open.neis.go.kr/hub',
//             changeOrigin: true,
//             pathRewrite: {
//                 '^/api': ''
//             }
//         })
//     )
// }