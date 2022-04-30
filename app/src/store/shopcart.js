//shopcart模块的小仓库
import {reqCartList, reqDeleteCartById, reqUpdateCheckedById} from '@/api'

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
    //删除产品
    async deleteCartById({commit}, skuId) {
        const result = await reqDeleteCartById(skuId);

        if (200 === result.code) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //修改商品的选中状态
    async updateCheckedById({commit}, {skuId, isChecked}) {
        const result = await reqUpdateCheckedById(skuId, isChecked);

        if (200 === result.code) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //删除选中的产品
    deleteAllCheckedCart({dispatch, getters}) {
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(item => {

            if (item.isChecked == 1) {
                const promise = dispatch('deleteCartById', item.skuId);
                PromiseAll.push(promise)

            }
        })
        return Promise.all(PromiseAll)
    },
    //修改全部产品的状态
    updateAllChecked({dispatch, state}, checked) {
        let PromiseAll = [];
        state.cartList[0].cartInfoList.forEach(item => {
            const promise = dispatch('updateCheckedById', {skuId:item.skuId, isChecked:checked});
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
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