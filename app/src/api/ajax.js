//对axios进行二次封装

import axios from "axios";
import nprogress from 'nprogress'
import 'nprogress/nprogress.css';
import store from '@/store'

const requests = axios.create({
    baseURL: "/api",
    timeout: 5000
})
//请求拦截器
requests.interceptors.request.use((config) => {
    //config 配置对象
    if (store.state.detail.uuid_token) {
        config.headers.userTempId = store.state.detail.uuid_token
    }
    //携带token给服务器
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    //进度条开始动
    nprogress.start();
    return config;
})
//响应拦截器
requests.interceptors.response.use((res) => {
    //进度条结束
    nprogress.done();
    return res.data;
}, (error) => {
    return Promise.reject(new Error('fail'))
})


export default requests