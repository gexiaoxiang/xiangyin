//shopcart模块的小仓库
import {reqCartList} from '@/api'

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
    async getCartList({commit}) {
        const result = await reqCartList();

        if (200 === result.code) {
            commit("GETCARTLIST", result.data)
        }
    },


};
//理解为计算属性
const getters = {
    cartList(state){

        return state.cartList[0]||{}
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}