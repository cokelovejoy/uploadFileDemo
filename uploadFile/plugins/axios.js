import Vue from 'vue'
import axios from 'axios'

const server = axios.create({
    baseURL: '/api'
})
// 请求拦截
// 主要做token的管理

// 响应拦截, 处理响应数据
server.interceptors.response.use(
    async response => {
        let { data } = response
        return data
    }
)
Vue.prototype.$http = server

export const http = server