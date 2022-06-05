import requests from "@/api/ajax";
import mockRequests from "@/api/mockAjax";

//三级联动接口
export const reqCategoryList = () => requests({url: '/product/getBaseCategoryList', method: 'get'})
//获取banner
export const reqGetBannerList = () => mockRequests.get('banner')
//获取floor数据
export const reqGetFloorList = () => mockRequests.get('floor')
//获取搜索模块数据地址 /api/list
/**
 {
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
 */
export const reqGetSearchInfo = (params) => requests({url: '/list', method: 'post', data: params})
//获取产品详情
export const reqGetGoodsInfo = (skuId) => requests({url: `/item/${skuId}`, method: 'get'})
//将产品添加到购物车中 /api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post'
})
//获取购物车列表 api/cart/cartList
export const reqCartList = () => requests({url: `/cart/cartList`, method: 'get'})
//删除购物车产品的接口
export const reqDeleteCartById = (skuId) => requests({url: `/cart/deleteCart/${skuId}`, method: 'delete'})
//修改商品的选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'get'
})
//获取验证码 api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) => requests({url: `/user/passport/sendCode/${phone}`, method: 'get'})
//注册
export const reqUserRegister = (data) => requests({url: `/user/passport/register`, data, method: 'post'})
//登录
export const reqUserLogin = (data) => requests({url: `/user/passport/login`, data, method: 'post'})
//获取用户信息
export const reqUserInfo = () => requests({url: `/user/passport/auth/getUserInfo`, method: 'get'})
//退出
export const reqUserLogout = () => requests({url: `/user/passport/logout`, method: 'get'})
//获取用户地址信息
export const reqAddressInfo = () => requests({url: `/user/userAddress/auth/findUserAddressList`, method: 'get'})
//获取商品清单
export const reqOrderInfo = () => requests({url: `/order/auth/trade`, method: 'get'})
//提交订单
export const reqSubmitOrder = (tradeNo,data) => requests({url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,data, method: 'post'})
//获取支付信息
export const reqPayInfo = (orderId) => requests({url: `/payment/weixin/createNative/${orderId}`, method: 'get'})
//获取个人中心
export const reqMyOrderList = (page,limit) => requests({url: `/order/auth/${page}/${limit}`, method: 'get'})
