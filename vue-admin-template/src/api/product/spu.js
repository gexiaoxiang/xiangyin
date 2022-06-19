import request from "@/utils/request";

export const reqSpuInfoList = () => request({
  url: '/admin/product/getCategory3/${category2Id}',
  methods: 'get'
})
