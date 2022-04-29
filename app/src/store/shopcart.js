//shopcart模块的小仓库
import {reqCartList, reqDeleteCartById} from '@/api'

//仓库存储数据的地方
const state = {
    cartList: []

};
//修改state的唯一手段
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    }
};
//处理action，可以书写自己业务逻辑
const actions = {
    //获取购物车列表
    async getCartList({commit}) {
        const result = await reqCartList();

        if (200 === result.code) {
            commit("GETCARTLIST", result.data)
        }
    },
    //获取购物车列表
    async deleteCartById({commit}, skuId) {
        const result = await reqDeleteCartById(skuId);

        if (200 === result.code) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },


};
//理解为计算属性
const getters = {
    cartList(state) {

        return state.cartList[0] || {}
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}