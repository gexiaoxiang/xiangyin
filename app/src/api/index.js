import requests from "@/api/ajax";
import mockRequests from "@/api/mockAjax";

//三级联动接口
export const reqCategoryList = () => requests({url: '/product/getBaseCategoryList', method: 'get'})
//获取banner
export const reqGetBannerList = () => mockRequests.get('banner')
//获取floor数据
export const reqGetFloorList = () => mockRequests.get('floor')
