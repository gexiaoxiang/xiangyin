//search模块的小仓库
//仓库存储数据的地方
import {reqGetSearchInfo} from '@/api'

const state = {
    searchList: {}
};
//修改state的唯一手段
const mutations = {
    GETSEARCHLIST(state, searchList){
        state.searchList=searchList
    }
};
//处理action，可以书写自己业务逻辑
const actions = {
    async getSearchList({commit},params={}) {
        const result = await reqGetSearchInfo(params);
        if(result.code==200){
            commit('GETSEARCHLIST',result.data)
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