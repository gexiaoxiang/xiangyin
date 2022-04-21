import Detail from "@/views/Detail";
import Home from "@/views/Home";
import Login from "@/views/Login";
import Register from "@/views/Register";
import Search from "@/views/Search";
import AddCartSuccess from "@/views/AddCartSuccess";
import ShopCart from "@/views/ShopCart";

export default [

    {
        path: "/shopcart",
        component: ShopCart,
        meta: {show: true}
    },
    {
        path: "/addcartsuccess",
        name: "addcartsuccess",
        component: AddCartSuccess,
        meta: {show: true}
    },
    {
        path: "/detail/:skuid",
        component: Detail,
        meta: {show: true}
    },
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