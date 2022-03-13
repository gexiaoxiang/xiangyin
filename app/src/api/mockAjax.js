//对axios进行二次封装

import axios from "axios";
import nprogress from 'nprogress'
import   'nprogress/nprogress.css';

const requests = axios.create({
    baseURL: "/mock",
    timeout: 5000
})
//请求拦截器
requests.interceptors.request.use((config) => {
    //config 配置对象
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