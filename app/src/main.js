import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from "@/store";
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import '@/mock/mockServe'
import 'swiper/css/swiper.css'
import * as API from '@/api'
import {Button,MessageBox} from 'element-ui'


//注册全局组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button)
Vue.prototype.$msgbox=MessageBox
Vue.prototype.$alert=MessageBox.alert

//引入插件
import '@/plugins/validate'

new Vue({
    render: h => h(App),
    //全局事件总线
    beforeCreate() {
        Vue.prototype.$bus = this
        Vue.prototype.$API = API
    },
    //注册路由
    router,
    //注册仓库
    store
}).$mount('#app')
