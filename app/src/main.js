import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from "@/store";
import TypeNav from '@/components/TypeNav'
//注册全局组件
Vue.component(TypeNav.name, TypeNav)

new Vue({
    render: h => h(App),
    //注册路由
    router,
    //注册仓库
    store
}).$mount('#app')
