<template>
  <div>
    <el-card>
      <CateGorySelect @getCategoryId="getCategoryId" :isShow="!show"></CateGorySelect>
    </el-card>
    <el-card>
      <el-button type="primary" icon="el-icon-plus">添加SPU</el-button>
      <el-table border style="width: 100%">
        <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
        <el-table-column prop="" label="spu名称"></el-table-column>
        <el-table-column prop="" label="spu描述"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="{row,$index}">
            <el-button type="success" icon="el-icon-plus" size="min"></el-button>
            <el-button type="waring" icon="el-icon-edit" size="min"></el-button>
            <el-button type="info" icon="el-icon-info" size="min"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="min"></el-button>

          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        style="text-align: center"
        :current-page="6"
        :page-sizes="[3,5,10]"
        :page-size="3"
        layout="prev, pager, next,jumper,->,sizes,total"
        :total="10">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "spu",
    data() {
      return {
        cForm: {},
        //控制三级联动的可操作性
        show: false,
      }
    },
    methods: {
      //三级联动自定义事件
      getCategoryId(cForm) {
        this.cForm = cForm

      },
      //获取SPU列表
      getSpuList() {

      }
    }
  }
</script>

<style scoped>

</style>
