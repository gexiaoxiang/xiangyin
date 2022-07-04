import request from "@/utils/request";


export const reqSpuSaleAttrList = (spuId) => request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: 'get'
})


export const reqSaveSkuInfo = (spuId) => request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: 'put'
})
