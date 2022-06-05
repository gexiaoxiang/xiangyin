//login and register

import {reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqUserLogout} from '@/api'
import {setToken, getToken, removeToken} from '@/utils/token'
//仓库存储数据的地方
const state = {
    code: '',
    token: getToken(),
    userInfo: {}

};
//修改state的唯一手段
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, data) {
        state.token = data.token
    },
    USERINFO(state, data) {
        state.userInfo = data
    },
    CLEAR(state, data) {
        state.userInfo = '';
        state.token = '';
        removeToken()
    }
};
//处理action，可以书写自己业务逻辑
const actions = {
    //获取验证码
    async getCode({commit}, phone) {
        const result = await reqGetCode(phone);
        if (200 == result.code) {
            commit('GETCODE', result.data)
            return 'ok'
        }
        return Promise.reject(new Error('faile'))
    },
    //注册
    async userRegister({commit}, user) {
        const result = await reqUserRegister(user);

        if (200 == result.code) {

            return 'ok'
        }
        return Promise.reject(new Error('faile'))
    },
    //登录
    async userLogin({commit}, user) {
        const result = await reqUserLogin(user);

        if (200 == result.code) {

            commit('USERLOGIN', result.data)
            setToken(result.data.token)
            return 'ok'
        }
        return Promise.reject(new Error('faile'))
    },
    //获取用户信息
    async userInfo({commit}) {
        const result = await reqUserInfo();

        if (200 == result.code) {

            commit('USERINFO', result.data)
            return 'ok'

        }
        return Promise.reject(new Error('faile'))
    },
    //退出登录
    async userLogout({commit}) {
        const result = await reqUserLogout();

        if (200 == result.code) {

            commit('CLEAR', result.data)
            return 'ok'
        }
        return Promise.reject(new Error('faile'))
    },


};
//理解为计算属性
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}