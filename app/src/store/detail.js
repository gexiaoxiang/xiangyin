//detail模块的小仓库
import {reqGetGoodsInfo} from '@/api'

//仓库存储数据的地方
const state = {
    goodInfo: {}

};
//修改state的唯一手段
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    }
};
//处理action，可以书写自己业务逻辑
const actions = {
    //
    async getGoodInfo({commit}, skuid) {
        const result = await reqGetGoodsInfo(skuid);
        if (200 === result.code) {
            commit("GETGOODINFO", result.data)
        }
    },


};
//理解为计算属性
const getters = {
    //路径导航
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}