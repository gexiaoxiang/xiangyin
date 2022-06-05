//路由懒加载

// import Detail from "@/views/Detail";
// import Home from "@/views/Home";
// import Login from "@/views/Login";
// import Register from "@/views/Register";
// import Search from "@/views/Search";
// import AddCartSuccess from "@/views/AddCartSuccess";
// import ShopCart from "@/views/ShopCart";
// import Trade from "@/views/Trade";
// import Pay from "@/views/Pay";
// import PaySuccess from "@/views/PaySuccess";

export default [
    {
        path: "/center",
        component: () => import('@/views/Center'),
        meta: {show: true},
        children: [
            {
                path: "myorder",
                component: () => import("@/views/Center/myOrder"),
            },
            {
                path: "grouporder",
                component: () => import("@/views/Center/groupOrder"),
            },
            {
                path: '',
                redirect: '/center/myorder'
            }
        ]
    }, {
        path: "/paySuccess",
        component:  () => import("@/views/PaySuccess"),
        meta: {show: true}
    },
    {
        path: "/pay",
        component: () => import("@/views/Pay"),
        meta: {show: true},
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        }
    }, {
        path: "/trade",
        component: () => import("@/views/Trade"),
        meta: {show: true},
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next()
            } else {
                next(false)
            }
        }
    }, {
        path: "/shopcart",
        component: import("@/views/ShopCart"),
        meta: {show: true}
    },
    {
        path: "/addcartsuccess",
        name: "addcartsuccess",
        component: ()=>import("@/views/AddCartSuccess"),
        meta: {show: true}
    },
    {
        path: "/detail/:skuId",
        component: ()=>import("@/views/Detail"),
        meta: {show: true}
    },
    {
        path: "/home",
        component: ()=>import("@/views/Home"),
        meta: {show: true}
    },
    {
        path: "/login",
        component:  ()=>import("@/views/Login"),
        meta: {show: false}
    },
    {
        path: "/register",
        component: ()=>import("@/views/Register"),
        meta: {show: false}
    },
    {
        path: "/search/:keyword?",//?代表params可传可不传
        component: ()=>import("@/views/Search"),
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