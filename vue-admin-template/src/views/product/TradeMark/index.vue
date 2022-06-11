<template>
  <div>
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0px">添加</el-button>

    <el-table :data="list" style="width: 100%" border>
      <el-table-column type="index" label="序号" width="80px" align="center"></el-table-column>
      <el-table-column prop="tmName" label="品牌" width="width"></el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{row,$index}">
          <img :src="row.logoUrl" alt="" style="width: 100px;height: 100px">
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{row,$index}">
          <el-button type="warning" icon="el-icon-edit" size="mini">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>

      </el-table-column>


    </el-table>
    <el-pagination
      style="margin-top: 20px;text-align: center"
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-count="7"
      :page-sizes="[3,5,10]"
      @current-change="getPageList"
      @size-change="handSizeChange"
      layout="prev, pager, next, jumper,->,sizes,total">


    </el-pagination>

  </div>
</template>

<script>
  export default {
    name: "tradeMark",
    data() {
      return {
        page: 1,
        limit: 3,
        total: 0,
        list: []

      }
    },
    mounted() {
      console.log(this.$API);
      this.getPageList();
    },
    methods: {
      async getPageList(pager=1) {
        this.page=pager
        const result = await this.$API.trademark.reqTradeMarkList(this.page, this.limit)
        if (result.code == 200) {
          console.log(result);
          this.total = result.data.total
          this.list = result.data.records
        }

      },
      handSizeChange(limit){
        this.limit=limit;
        this.getPageList();
      }
    }
  }
</script>

<style scoped>

</style>
