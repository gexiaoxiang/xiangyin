import request from "@/utils/request";

//获取一级分类 /admin/product/getCategory1
export const reqCategory1List = () => request({url: '/admin/product/getCategory1', method: 'get'})

//获取二级分类 /admin/product/getCategory2/{category1Id}
export const reqCategory2List = (category1Id) => request({
  url: `/admin/product/getCategory2/${category1Id}`,
  method: 'get'
})

// 获取三级分类 /admin/product/getCategory3/{category2Id}
export const reqCategory3List = (category2Id) => request({
  url: `/admin/product/getCategory3/${category2Id}`,
  method: 'get'
});


// 商品基础属性接口
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => request({
  url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
  method: 'get'
});

// 保存商品基础属性接口
export const reqAddAttr = (data) => request({
  url: `/admin/product/saveAttrInfo`,
  data,
  method: 'post'
});
