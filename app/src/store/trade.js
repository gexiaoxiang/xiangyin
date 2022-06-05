import {reqAddressInfo, reqOrderInfo} from '@/api/index'

const state = {
    addressList: [],
    orderInfo: []
}
const mutations = {
    GETUSEADDRESS(state, data) {
        state.addressList = data
    }
    , GETORDERINFO(state, data) {

        state.orderInfo = data
    }
}
const actions = {

    async getUseAddress({commit}) {
        const result = await reqAddressInfo();
        if (200 == result.code) {
            commit('GETUSEADDRESS', result.data)
        }
    },
    async getOrderInfo({commit}) {
        const result = await reqOrderInfo();
        if (200 == result.code) {
            commit('GETORDERINFO', result.data)
        }
    }


}
const getters = {}

export default {
    state,
    mutations,
    actions,
    getters
}