import Vue from 'vue'
import axios from 'axios'
import { MessageBox } from 'element-ui'
const server = axios.create({
    baseURL: '/api'
})
Vue.prototype.$http = server

export default ({store, redirect}) => {
    // 请求拦截
    // 主要做token的管理
    server.interceptors.request.use(
        async config => {
            const token = localStorage.getItem('token')
            if (token) {
                config.headers.common['Authorization'] = 'Bearer ' + token
            }
            return config
        }
    )

    // 响应拦截, 处理响应数据
    server.interceptors.response.use(
        async response => {
            let { data } = response
            if (data.code === -666) {
                MessageBox.confirm('登录过期', '过期', {
                    confirmButtonText: '登录',
                    showCancelButton: false,
                    type: 'warning'
                }).then(() => {
                    localStorage.removeItem('token')
                    redirect({ path: 'login' })
                })
            }
            return data
        }
    )
}


export const http = server