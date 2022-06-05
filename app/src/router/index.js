//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '@/router/routes'
import store from '@/store'
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


//配置路由
const router = new VueRouter({
    routes,
    //滚动行为
    scrollBehavior(to, from, savedPosition) {
        return {x: 0, y: 0}

    }
})
//全局守卫：前置守卫
router.beforeEach(async (to, from, next) => {

    // next()
    const token = store.state.user.token;
    const name = store.state.user.userInfo.name;

    //已经登录
    const path = to.path;
    if (token) {
        if (path == '/login') {
            next('/home')
        } else {

            if (name) {
                next()
            } else {
                try {
                    await store.dispatch('userInfo')
                    next()
                } catch (e) {
                    //token失效
                    // alert('token失效')
                    await store.dispatch('userLogout')
                    next('/login')

                    //自动登录
                    // store.dispatch('userLogin', {phone:'13700000000', password:'111111'})
                }
            }
        }
    } else {
        //未登录
        if (path.indexOf('/trade') != -1
            || path.indexOf('/pay') != -1
            || path.indexOf('/center') != -1
        ) {
            next('/login?redirect=' + path)
        } else {
            next()
        }


    }
})

export default router