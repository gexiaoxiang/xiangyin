import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
//三级联动组件---注册全局组件
import TypeNav from '@/pages/Home/TypeNav'
Vue.component(TypeNav.name,TypeNav)

//引入路由
import router from '@/router'

new Vue({
    render: h => h(App),
    //注册路由
    router
}).$mount('#app')
