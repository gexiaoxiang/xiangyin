1:vue-cli脚手架初始化项目 vue create app

node_modules:项目依赖
public:一般放置一些静态资源，里面的资源webpack会原封不动的打包到dist
src:
    assets:一般也是放置多个组件共用的静态资源
    components:一般放置非路由组件(全局组件)
    App.vue:唯一的根组件
    main.js:程序的入口文件
babel.config.js:配置文件(babel相关)
package.json:认为项目的身份证，记录项目叫什么、有哪些依赖等等
package-lock.json:缓存行文件
2:项目的其他配置

2.1项目运行起来的时候,让浏览器自动打开
--package.json
"scripts": {
"serve": "vue-cli-service serve --open",
"build": "vue-cli-service build",
"lint": "vue-cli-service lint"
},

2.2eslint校验功能关闭
--在根目录下，创建一个vue.config.js
比如:声明变量但没有使用eslint校验工具报错

2.3src文件夹的简写方式，配置别名
jsconfig.json配置别名@提示
{
    "compileOptions":{
        "baseUrl":"./",
        "path":{
                "@/*":["src/*"]
                }
    "exclude":["node_mudules","dist"]
}
}

3.项目路由分析
项目上中下结构

路由组件
Home首页路由组件、Search路由组件、login组件
非路由组件:Header、Footer

如果想让组件识别less样式，需要在style标签的身上加上lang=less

4.1使用组件的步骤(非路由组件)
-创建或者定义
-引入
-注册
-使用


5路由组件的搭建：Home、Search、Login、Register
-components:放置非路由组件（全局组件）
-pages|views:放置路由组件
5.1项目中配置的路由一般放置在router文件夹中

5.2路由组件一般需要在router文件夹中注册、非路由组件一般以标签的方式使用

$route:一般获取路由信息【路径、query、params等】
$router:一般进行编程式导航进行路由跳转【push、replace】

5.3路由的跳转
路由的两种跳转形式：
声明式导航router-link
编程式导航push|replace

编程式导航：声明式导航能做的编程式导航都能做，但是编程式导航还可以做一些其他的业务逻辑
        