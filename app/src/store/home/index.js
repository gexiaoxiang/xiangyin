//home模块的小仓库
import {reqCategoryList, reqGetBannerList} from '@/api'

//仓库存储数据的地方
const state = {
    categoryList: [],
    bannerList: []
};
//修改state的唯一手段
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    }, BANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    }
};
//处理action，可以书写自己业务逻辑
const actions = {
    //通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async categoryList({commit}) {
        const result = await reqCategoryList();
        if (200 === result.code) {
            commit("CATEGORYLIST", result.data)
        }
    },
    async getBannerList({commit}) {
        const result = await reqGetBannerList();
        if (200 === result.code) {
            commit("BANNERLIST", result.data)
        }

    }

};
//理解为计算属性
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}