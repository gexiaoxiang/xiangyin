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
