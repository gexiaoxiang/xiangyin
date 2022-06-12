import request from '@/utils/request'


//获取品牌列表
export const reqTradeMarkList = (page, limit) => request({
  url: `/admin/product/baseTrademark/${page}/${limit}`,
  method: 'get'
});

//添加品牌
export const reqAddOrUpdateTradeMark = (tradeMark) => {
  if (!tradeMark.id) {
    return request({url: `/admin/product/baseTrademark/save`, method: 'post', data: tradeMark});
  } else {
    return request({url: `/admin/product/baseTrademark/update`, method: 'put', data: tradeMark});

  }
}


