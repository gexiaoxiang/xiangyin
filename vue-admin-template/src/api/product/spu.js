import request from "@/utils/request";

export const reqSpuInfoList = (page, limit, category3Id) => request({
  url: `/admin/product/${page}/${limit}`,
  methods: 'get',
  params: {category3Id}
})
