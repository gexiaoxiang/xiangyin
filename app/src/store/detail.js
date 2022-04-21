//detail模块的小仓库
import {reqGetGoodsInfo, reqAddOrUpdateShopCart} from '@/api'
import {getUUID} from '@/utils/uuid_token'
//仓库存储数据的地方
const state = {
    goodInfo: {},
    //游客临时身份
    uuid_token:getUUID()

};
//修改state的唯一手段
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    }
};
//处理action，可以书写自己业务逻辑
const actions = {
    //获取产品信息的action
    async getGoodInfo({commit}, skuid) {
        const result = await reqGetGoodsInfo(skuid);
        if (200 === result.code) {
            commit("GETGOODINFO", result.data)
        }
    },
    //将产品添加到购物车
    async addOrUpdateShopCart({commit}, {skuid, skuNum}) {
        const result = await reqAddOrUpdateShopCart(skuid, skuNum);
        if (200 === result.code) {
            return "ok"
        }
        return Promise.reject(new Error('faile'))
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