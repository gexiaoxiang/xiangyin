//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
//使用插件
Vue.use(VueRouter);

//重复跳转异常问题
const VueRouterPush = VueRouter.prototype.push
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
VueRouter.prototype.replace = function replace (to) {
    return VueRouterReplace.call(this, to).catch(err => err)
}

import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'

//配置路由
export default new VueRouter({
    routes: [
        {
            path: "/home",
            component: Home,
            meta:{show:true}
        },
        {
            path: "/login",
            component: Login,
            meta:{show:false}
        },
        {
            path: "/register",
            component: Register,
            meta:{show:false}
        },
        {
            path: "/search",
            component: Search,
            meta:{show:true}
        },
        //重定向，访问/ 立马访问首页
        {
            path: "*",
            redirect: '/home'
        },
    ]
})