<template>
  <div>
    <el-card>
      <CateGorySelect @getCategoryId="getCategoryId" :isShow="!show"></CateGorySelect>
    </el-card>
    <el-card>
      <!-- 列表 -->
      <div v-show="scene==0">
        <el-button type="primary" icon="el-icon-plus">添加SPU</el-button>
        <el-table border style="width: 100%" :data="list">
          <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
          <el-table-column prop="spuName" label="spu名称"></el-table-column>
          <el-table-column prop="description" label="spu描述"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="{row,$index}">
              <HintButton title="添加sku" type="success" icon="el-icon-plus" size="mini"></HintButton>
              <HintButton title="修改spu" type="waring" icon="el-icon-edit" size="mini"></HintButton>
              <HintButton title="查看当前spu的所有实例" type="info" icon="el-icon-info" size="mini"></HintButton>
              <HintButton title="删除spu" type="danger" icon="el-icon-delete" size="mini"></HintButton>

            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align: center"
          @size-change="changeSize"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[3,5,10]"
          :page-size="limit"
          layout="prev, pager, next,jumper,->,sizes,total"
          :total="total">
        </el-pagination>
      </div>
      <!-- 添加|修改SPU -->

      <SpuForm v-show="scene==1"></SpuForm>

      <!-- 添加SKU -->
      <SkuForm v-show="scene==2"></SkuForm>

    </el-card>
  </div>
</template>

<script>
  import SkuForm from './SkuForm'
  import SpuForm from './SpuForm'

  export default {
    name: "spu",
    components: {
      SkuForm, SpuForm
    },
    data() {
      return {
        limit: 3,
        page: 1,
        total: 0,
        cForm: {},
        list: [],
        //控制三级联动的可操作性
        show: true,
        //0 展示SPU列表  1 添加|修改SPU 2 添加 SKU
        scene: 0,
      }
    },
    methods: {
      //三级联动自定义事件
      getCategoryId(cForm) {
        this.cForm = cForm
        this.getSpuList();

      },
      //点击分页器的第几页按钮回调
      handleCurrentChange(page) {
        this.page = page
        this.getSpuList();
      },
      //修改分页器每页条数的按钮回调
      changeSize(sizes) {
        this.limit = sizes
        this.getSpuList();
      },
      //获取SPU列表
      async getSpuList() {
        const result = await this.$API.spu.reqSpuInfoList(this.page, this.limit, this.cForm.category3Id);
        if (result.code == 200) {
          this.list = result.data.records
          this.total = result.data.total
          this.limit = result.data.size
        }
      }
    }
  }
</script>

<style scoped>

</style>
