import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from "@/store";
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import '@/mock/mockServe'
import  'swiper/css/swiper.css'


//注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)

new Vue({
    render: h => h(App),
    //注册路由
    router,
    //注册仓库
    store
}).$mount('#app')
