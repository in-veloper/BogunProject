/* eslint-disable */

import { createProxyMiddleware } from 'http-proxy-middleware';

//https://open.neis.go.kr/hub/schoolInfo

export default function (app) {
    app.use(
        '/api',
        createProxyMiddleware('/api', {
            target: 'https://open.neis.go.kr/hub',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        })
    )
}