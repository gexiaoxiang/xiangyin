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
export const reqAddOrUpdateShopCart = (skuId,skuNum) => requests({url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post'})
//获取购物车列表 api/cart/cartList
export const reqCartList = () => requests({url: `/cart/cartList`, method: 'get'})
//删除购物车产品的接口
export const reqDeleteCartById = (skuId) => requests({url: `/cart/deleteCart/${skuId}`, method: 'delete'})
//修改商品的选中状态
export const reqUpdateCheckedById = (skuId,isChecked) => requests({url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get'})
