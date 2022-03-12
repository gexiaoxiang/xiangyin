//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
//使用插件
Vue.use(VueRouter);

//重复跳转异常问题
const VueRouterPush = VueRouter.prototype.push
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        VueRouterPush.call(this, location, resolve, reject)
    } else {
        VueRouterPush.call(this, location, () => {
        }, () => {
        })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        VueRouterPush.call(this, location, resolve, reject)
    } else {
        VueRouterPush.call(this, location, () => {
        }, () => {
        })
    }
}


import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Search from '@/views/Search'

//配置路由
export default new VueRouter({
    routes: [
        {
            path: "/home",
            component: Home,
            meta: {show: true}
        },
        {
            path: "/login",
            component: Login,
            meta: {show: false}
        },
        {
            path: "/register",
            component: Register,
            meta: {show: false}
        },
        {
            path: "/search/:keyword?",//?代表params可传可不传
            component: Search,
            meta: {show: true},
            name: "search",
            //路由传递props 3种写法
            //布尔值写法
            // props:true,
            //对象写法
            // props: {a:1,b:2},
            //函数写法
            props: ($route) => {
                return {
                    keyword: $route.params.keyword, k: $route.query.k
                }
            }
        },
        //重定向，访问/ 立马访问首页
        {
            path: "*",
            redirect: '/home'
        },
    ]
})