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


import routes from '@/router/routes'

//配置路由
export default new VueRouter({
    routes,
    //滚动行为
    scrollBehavior(to, from, savedPosition) {
        return {x: 0, y: 0}

    }
})