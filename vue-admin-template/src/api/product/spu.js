import request from "@/utils/request";
//获取spu列表
export const reqSpuInfoList = (page, limit, category3Id) => request({
  url: `/admin/product/${page}/${limit}`,
  methods: 'get',
  params: {category3Id}
})
//获取spu信息
export const reqSpu = (spuId) => request({
  url: `/admin/product/getSpuById/${spuId}`,
  methods: 'get'
})
//获取spu图片的接口
export const reqSpuImageList = (spuId) => request({
  url: `/admin/product/spuImageList/${spuId}`,
  methods: 'get'
})
//获取平台的销售属性
export const reqBaseSaleAttrList = () => request({
  url: `/admin/product/baseSaleAttrList`,
  methods: 'get'
})
//修改||添加SPU
export const reqSaveOrUpdateSpu = (spuInfo) => {

  if (spuInfo.id) {
    return request({url: '/admin/product/updateSpuInfo', method: 'post', data: spuInfo})
  } else {
    return request({url: '/admin/product/saveSpuInfo', method: 'post', data: spuInfo})

  }

}
//删除SPU
export const reqDeleteSpu = (spuId) => request({
  url: `/admin/product/deleteSpu/${spuId}`,
  method: 'delete'
})


//添加SKU
export const reqAddSku = (skuInfo) => request({
  url: `/admin/product/saveSkuInfo/`,
  data: skuInfo,
  method: 'post'
})



